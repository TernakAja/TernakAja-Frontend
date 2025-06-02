export const livestockData = {
    id: "1",
    name: "Bella",
    tag: "HOL-1234",
    species: "Cattle",
    breed: "Holstein",
    gender: "Female",
    birthDate: "March 15, 2019",
    age: "4 years",
    weight: "1,200 lbs",
    status: "healthy",
    location: "Barn A",
    pen: "A-12",
    acquisition: {
      date: "April 10, 2019",
      source: "Green Valley Farms",
      price: "$2,500",
    },
    vitalSigns: {
      heartRate: {
        current: "65 BPM",
        normal: "60-70 BPM",
        status: "normal",
      },
      temperature: {
        current: "101.5°F",
        normal: "101.5°F",
        status: "normal",
      },
      respiratoryRate: {
        current: "28 breaths/min",
        normal: "26-30 breaths/min",
        status: "normal",
      },
      rumination: {
        current: "8 hours/day",
        normal: "7-9 hours/day",
        status: "normal",
      },
    },
    feeding: {
      diet: "High-quality forage with grain supplement",
      schedule: "Twice daily",
      consumption: "55 lbs/day",
      waterIntake: "25 gallons/day",
    },
    reproduction: {
      status: "Pregnant",
      breedingDate: "October 15, 2022",
      dueDate: "July 24, 2023",
      previousCalvings: 2,
      lastCalvingDate: "May 10, 2022",
    },
    health: {
      vaccinations: [
        {
          name: "Bovine Viral Diarrhea (BVD)",
          date: "January 15, 2023",
          nextDue: "January 15, 2024",
        },
        {
          name: "Infectious Bovine Rhinotracheitis (IBR)",
          date: "January 15, 2023",
          nextDue: "January 15, 2024",
        },
        {
          name: "Leptospirosis",
          date: "January 15, 2023",
          nextDue: "January 15, 2024",
        },
      ],
      medicalHistory: [
        {
          event: "Routine Check-up",
          date: "January 10, 2023",
          notes: "All vital signs normal. No issues detected.",
        },
        {
          event: "Hoof Trimming",
          date: "November 5, 2022",
          notes: "Routine maintenance. No issues detected.",
        },
        {
          event: "Vaccination",
          date: "June 10, 2022",
          notes: "Annual vaccinations administered. No adverse reactions.",
        },
      ],
    },
    production: {
      milkProduction: {
        average: "22 liters per day",
        trend: "Stable over past 12 months",
        quality: "High butterfat content",
      },
    },
    genetics: {
      sire: "Champion's Pride (CP-789)",
      dam: "Meadow Beauty (MB-456)",
      geneticTraits: ["High milk production", "Good udder conformation", "Docile temperament"],
    },
    notes:
      "Bella is one of our top milk producers with an excellent temperament. She has had no significant health issues and has produced two healthy calves.",
    lastUpdated: "10 minutes ago",
    image: "/placeholder.svg?height=300&width=300",
}