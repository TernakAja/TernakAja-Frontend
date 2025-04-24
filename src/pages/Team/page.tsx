import TeamHero from "@/components/Team/team-hero"
import TeamMembers from "@/components/Team/team-members"
import TeamValues from "@/components/Team/team-values"
import JoinTeam from "@/components/Team/join-team"

export default function TeamPage() {
  return (
    <main className="overflow-hidden">
      <TeamHero />
      <TeamMembers />
      <TeamValues />
      <JoinTeam />
    </main>
  )
}
