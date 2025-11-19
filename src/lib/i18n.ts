// Internationalization system for Fit4All

export type Language = 'pt' | 'en'

export const translations = {
  pt: {
    // App name
    appName: 'Fit4All',
    appTagline: 'Seu personal trainer digital',
    
    // Common
    back: 'Voltar',
    continue: 'Continuar',
    finish: 'Finalizar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Deletar',
    confirm: 'Confirmar',
    close: 'Fechar',
    loading: 'Carregando...',
    
    // Onboarding
    onboarding: {
      step: 'Etapa',
      of: 'de',
      goal: {
        title: 'Qual seu objetivo?',
        hypertrophy: 'Hipertrofia',
        weightLoss: 'Emagrecimento',
        strength: 'Força',
        endurance: 'Resistência'
      },
      level: {
        title: 'Qual seu nível?',
        beginner: 'Iniciante',
        intermediate: 'Intermediário',
        advanced: 'Avançado'
      },
      frequency: {
        title: 'Quantos dias por semana?',
        days3: '3 dias',
        days4: '4 dias',
        days5: '5 dias',
        days6: '6 dias'
      },
      duration: {
        title: 'Tempo por sessão?',
        short: '30-45 min',
        medium: '45-60 min',
        long: '60-90 min',
        veryLong: '90+ min'
      },
      equipment: {
        title: 'Equipamentos disponíveis?',
        fullGym: 'Academia completa',
        homeGym: 'Home gym',
        bodyweight: 'Peso corporal',
        bands: 'Elásticos'
      }
    },
    
    // Dashboard
    dashboard: {
      greeting: 'Olá',
      subtitle: 'Vamos treinar hoje?',
      calories: 'Calorias',
      water: 'Água',
      todayWorkout: 'Treino de Hoje',
      exercises: 'exercícios',
      min: 'min',
      startWorkout: 'Iniciar Treino',
      macros: 'Macronutrientes',
      protein: 'Proteína',
      carbs: 'Carboidratos',
      fat: 'Gordura',
      diet: 'Dieta',
      progress: 'Progresso',
      nextUpdateIn: 'Próxima atualização disponível em',
      days: 'dias'
    },
    
    // Plans
    plans: {
      current: 'Plano Atual',
      basic: 'Básico',
      pro: 'Pro',
      upgrade: 'Upgrade',
      upgradeToPro: 'Upgrade para Pro',
      unlockPotential: 'Desbloqueie todo o potencial',
      limitedResources: 'Recursos limitados',
      basicDescription: 'Treino e dieta gerados 1x por mês • Check-in a cada 30 dias',
      proFeatures: 'Recursos Pro',
      perMonth: '/mês',
      cancelAnytime: 'Cancele quando quiser',
      subscribe: 'Assinar Plano Pro',
      terms: 'Ao assinar, você concorda com nossos termos de serviço',
      features: {
        unlimitedWorkouts: 'Treino personalizado atualizado sempre que quiser',
        unlimitedDiet: 'Dieta personalizada com ajustes ilimitados',
        frequentCheckins: 'Check-ins a cada 15 dias (ou sempre que quiser)',
        fullReport: 'Relatório completo de evolução com análise',
        photoComparison: 'Comparação visual entre fotos antigas e novas',
        motivationalMessages: 'Mensagens motivacionais automáticas',
        aiChat: 'IA disponível para dúvidas rápidas',
        fullLibrary: 'Acesso total à biblioteca de artigos',
        workoutHistory: 'Histórico de treinos concluídos',
        badges: 'Recompensas e sistema de badges',
        pdfDownload: 'Possibilidade de baixar treino em PDF'
      },
      locked: 'Recurso Pro'
    },
    
    // Workout
    workout: {
      title: 'Treino',
      todayWorkout: 'Treino de Hoje',
      workoutName: 'Peito e Tríceps',
      sets: 'séries',
      reps: 'reps',
      weight: 'Carga (kg)',
      rpe: 'RPE',
      rest: 'Descanso',
      restTime: 'Tempo de descanso',
      skipRest: 'Pular Descanso',
      watchVideo: 'Ver Vídeo',
      history: 'Histórico',
      finishWorkout: 'Finalizar Treino',
      downloadPDF: 'Baixar Treino em PDF',
      exercises: {
        benchPress: 'Supino Reto',
        inclineBench: 'Supino Inclinado',
        flyDumbbell: 'Crucifixo',
        dips: 'Paralelas',
        skullCrusher: 'Tríceps Testa',
        tricepsRope: 'Tríceps Corda'
      }
    },
    
    // Diet
    diet: {
      title: 'Dieta do Dia',
      dailySummary: 'Resumo Diário',
      meals: {
        breakfast: 'Café da Manhã',
        morningSnack: 'Lanche da Manhã',
        lunch: 'Almoço',
        afternoonSnack: 'Lanche da Tarde',
        dinner: 'Jantar',
        supper: 'Ceia'
      },
      hydration: 'Hidratação',
      glasses: 'copos',
      askAI: 'Perguntar à IA'
    },
    
    // Progress
    progress: {
      title: 'Progresso',
      bodyWeight: 'Peso Corporal',
      bodyMeasurements: 'Medidas Corporais',
      chest: 'Peito',
      arm: 'Braço',
      waist: 'Cintura',
      thigh: 'Coxa',
      workoutVolume: 'Volume de Treino',
      photoComparison: 'Comparação de Fotos',
      viewAll: 'Ver Todas',
      nextCheckinIn: 'Próximo check-in disponível em'
    },
    
    // Profile
    profile: {
      title: 'Perfil',
      streak: 'Dias seguidos',
      currentWeight: 'Peso atual',
      goal: 'Meta',
      upgradeDescription: 'Treinos ilimitados, IA personalizada, comparação de fotos e muito mais',
      viewPlans: 'Ver Planos',
      menu: {
        goals: 'Meus Objetivos',
        plan: 'Plano de Treino',
        library: 'Biblioteca',
        badges: 'Badges e Conquistas',
        stats: 'Estatísticas',
        settings: 'Configurações'
      },
      resetOnboarding: 'Refazer Configuração Inicial'
    },
    
    // Bottom Navigation
    nav: {
      home: 'Início',
      workout: 'Treino',
      diet: 'Dieta',
      progress: 'Progresso',
      profile: 'Perfil'
    }
  },
  
  en: {
    // App name
    appName: 'Fit4All',
    appTagline: 'Your digital personal trainer',
    
    // Common
    back: 'Back',
    continue: 'Continue',
    finish: 'Finish',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    close: 'Close',
    loading: 'Loading...',
    
    // Onboarding
    onboarding: {
      step: 'Step',
      of: 'of',
      goal: {
        title: 'What is your goal?',
        hypertrophy: 'Hypertrophy',
        weightLoss: 'Weight Loss',
        strength: 'Strength',
        endurance: 'Endurance'
      },
      level: {
        title: 'What is your level?',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      },
      frequency: {
        title: 'How many days per week?',
        days3: '3 days',
        days4: '4 days',
        days5: '5 days',
        days6: '6 days'
      },
      duration: {
        title: 'Time per session?',
        short: '30-45 min',
        medium: '45-60 min',
        long: '60-90 min',
        veryLong: '90+ min'
      },
      equipment: {
        title: 'Available equipment?',
        fullGym: 'Full gym',
        homeGym: 'Home gym',
        bodyweight: 'Bodyweight',
        bands: 'Resistance bands'
      }
    },
    
    // Dashboard
    dashboard: {
      greeting: 'Hello',
      subtitle: 'Ready to workout today?',
      calories: 'Calories',
      water: 'Water',
      todayWorkout: "Today's Workout",
      exercises: 'exercises',
      min: 'min',
      startWorkout: 'Start Workout',
      macros: 'Macronutrients',
      protein: 'Protein',
      carbs: 'Carbs',
      fat: 'Fat',
      diet: 'Diet',
      progress: 'Progress',
      nextUpdateIn: 'Next update available in',
      days: 'days'
    },
    
    // Plans
    plans: {
      current: 'Current Plan',
      basic: 'Basic',
      pro: 'Pro',
      upgrade: 'Upgrade',
      upgradeToPro: 'Upgrade to Pro',
      unlockPotential: 'Unlock your full potential',
      limitedResources: 'Limited resources',
      basicDescription: 'Workout and diet generated once per month • Check-in every 30 days',
      proFeatures: 'Pro Features',
      perMonth: '/month',
      cancelAnytime: 'Cancel anytime',
      subscribe: 'Subscribe to Pro Plan',
      terms: 'By subscribing, you agree to our terms of service',
      features: {
        unlimitedWorkouts: 'Personalized workout updated whenever you want',
        unlimitedDiet: 'Personalized diet with unlimited adjustments',
        frequentCheckins: 'Check-ins every 15 days (or whenever you want)',
        fullReport: 'Complete evolution report with analysis',
        photoComparison: 'Visual comparison between old and new photos',
        motivationalMessages: 'Automatic motivational messages',
        aiChat: 'AI available for quick questions',
        fullLibrary: 'Full access to articles library',
        workoutHistory: 'Completed workouts history',
        badges: 'Rewards and badge system',
        pdfDownload: 'Download workout as PDF'
      },
      locked: 'Pro Feature'
    },
    
    // Workout
    workout: {
      title: 'Workout',
      todayWorkout: "Today's Workout",
      workoutName: 'Chest & Triceps',
      sets: 'sets',
      reps: 'reps',
      weight: 'Weight (kg)',
      rpe: 'RPE',
      rest: 'Rest',
      restTime: 'Rest time',
      skipRest: 'Skip Rest',
      watchVideo: 'Watch Video',
      history: 'History',
      finishWorkout: 'Finish Workout',
      downloadPDF: 'Download Workout as PDF',
      exercises: {
        benchPress: 'Bench Press',
        inclineBench: 'Incline Bench Press',
        flyDumbbell: 'Dumbbell Fly',
        dips: 'Dips',
        skullCrusher: 'Skull Crusher',
        tricepsRope: 'Triceps Rope Pushdown'
      }
    },
    
    // Diet
    diet: {
      title: 'Daily Diet',
      dailySummary: 'Daily Summary',
      meals: {
        breakfast: 'Breakfast',
        morningSnack: 'Morning Snack',
        lunch: 'Lunch',
        afternoonSnack: 'Afternoon Snack',
        dinner: 'Dinner',
        supper: 'Supper'
      },
      hydration: 'Hydration',
      glasses: 'glasses',
      askAI: 'Ask AI'
    },
    
    // Progress
    progress: {
      title: 'Progress',
      bodyWeight: 'Body Weight',
      bodyMeasurements: 'Body Measurements',
      chest: 'Chest',
      arm: 'Arm',
      waist: 'Waist',
      thigh: 'Thigh',
      workoutVolume: 'Workout Volume',
      photoComparison: 'Photo Comparison',
      viewAll: 'View All',
      nextCheckinIn: 'Next check-in available in'
    },
    
    // Profile
    profile: {
      title: 'Profile',
      streak: 'Day streak',
      currentWeight: 'Current weight',
      goal: 'Goal',
      upgradeDescription: 'Unlimited workouts, personalized AI, photo comparison and much more',
      viewPlans: 'View Plans',
      menu: {
        goals: 'My Goals',
        plan: 'Workout Plan',
        library: 'Library',
        badges: 'Badges & Achievements',
        stats: 'Statistics',
        settings: 'Settings'
      },
      resetOnboarding: 'Reset Initial Setup'
    },
    
    // Bottom Navigation
    nav: {
      home: 'Home',
      workout: 'Workout',
      diet: 'Diet',
      progress: 'Progress',
      profile: 'Profile'
    }
  }
}

export function getTranslation(lang: Language) {
  return translations[lang]
}

export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'pt'
  
  const browserLang = navigator.language.toLowerCase()
  
  if (browserLang.startsWith('en')) return 'en'
  if (browserLang.startsWith('pt')) return 'pt'
  
  return 'pt' // Default to Portuguese
}
