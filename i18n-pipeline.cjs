const fs = require('fs');
const path = require('path');
const recast = require('recast');
const babelParser = require('@babel/parser');
const { execSync } = require('child_process');
const { visit } = recast.types;

const parser = {
  parse(source) {
    return babelParser.parse(source, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
  },
};

const dirToScan = 'src';

function replaceHardcodedStringsWithT(ast) {
  visit(ast, {
    visitJSXElement(path) {
      path.node.children = path.node.children.map(child => {
        if (child.type === 'JSXText') {
          const text = child.value.trim();
          if (text) {
            const expr = `t(${JSON.stringify(text)})`;
            return recast.parseExpression(expr, { parser });
          }
        }
        return child;
      });
      this.traverse(path);
    },
    visitJSXAttribute(path) {
      const attr = path.node;
      if (attr.value && attr.value.type === 'Literal') {
        const text = attr.value.value.trim();
        if (text) {
          const expr = `t(${JSON.stringify(text)})`;
          attr.value = {
            type: 'JSXExpressionContainer',
            expression: recast.parseExpression(expr, { parser }),
          };
        }
      }
      this.traverse(path);
    },
  });
}

function fileContainsTUsage(ast) {
  let found = false;
  visit(ast, {
    visitIdentifier(path) {
      if (path.node.name === 't') {
        found = true;
      }
      this.traverse(path);
    },
  });
  return found;
}

function hasUseTranslationImport(ast) {
  let found = false;
  visit(ast, {
    visitImportDeclaration(path) {
      if (path.node.source.value === 'react-i18next') {
        found = true;
      }
      this.traverse(path);
    },
  });
  return found;
}

function addUseTranslationImport(ast) {
  const importDeclaration = recast.parse(
    `import { useTranslation } from 'react-i18next';\n`
  ).program.body[0];
  ast.program.body.unshift(importDeclaration);
}

function addUseTranslationDeclaration(ast) {
  visit(ast, {
    visitFunctionDeclaration(path) {
      const body = path.node.body.body;
      const alreadyHas = body.some(
        (stmt) =>
          stmt.type === 'VariableDeclaration' &&
          stmt.declarations.some((d) => d.id.name === 't')
      );
      if (!alreadyHas) {
        const useT = recast.parse('const { t } = useTranslation();').program
          .body[0];
        body.unshift(useT);
      }
      return false;
    },
    visitVariableDeclaration(path) {
      const decl = path.node.declarations[0];
      if (
        decl.init &&
        (decl.init.type === 'ArrowFunctionExpression' ||
          decl.init.type === 'FunctionExpression')
      ) {
        const body = decl.init.body.body || [];
        const alreadyHas = body.some(
          (stmt) =>
            stmt.type === 'VariableDeclaration' &&
            stmt.declarations.some((d) => d.id.name === 't')
        );
        if (!alreadyHas) {
          const useT = recast.parse('const { t } = useTranslation();').program
            .body[0];
          body.unshift(useT);
        }
      }
      return false;
    },
  });
}

function processFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  const ast = recast.parse(code, { parser });

  replaceHardcodedStringsWithT(ast);

  const usesT = fileContainsTUsage(ast);
  if (usesT) {
    if (!hasUseTranslationImport(ast)) {
      addUseTranslationImport(ast);
    }
    addUseTranslationDeclaration(ast);
  }

  const output = recast.print(ast).code;
  fs.writeFileSync(filePath, output, 'utf-8');
  console.log(`✅ Processed: ${filePath}`);
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      try {
        processFile(full);
      } catch (err) {
        console.error(`❌ Failed to process ${full}:`, err.message);
      }
    }
  });
}

// Step 1–2: Refactor all files
console.log('🛠️ Refactoring all JSX to use t("...") and useTranslation...');
walk(dirToScan);

// Step 3: Run i18next-parser
// console.log('\n📦 Generating en/common.json using i18next-parser...');
// execSync(
//   'npx i18next --config i18next-parser.config.js',
//   { stdio: 'inherit' }
// );

console.log('\n🎉 Selesai! en/common.json berhasil dibuat!');