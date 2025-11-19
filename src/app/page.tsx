'use client'

import { useState, useEffect } from 'react'
import { Play, Target, Calendar, TrendingUp, Book, Settings, User, Home, Dumbbell, Apple, BarChart3, ChevronRight, Plus, Timer, Droplets, Flame, Activity, Award, Clock, CheckCircle2, Circle, Crown, Lock, Zap, Download, MessageCircle, Camera, FileText, AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'

// Mock data will be translated dynamically based on language
const getMockWorkout = (t: any) => ({
  name: t.workout.workoutName,
  exercises: [
    { name: String(t.workout.exercises?.benchPress || 'Bench Press'), sets: 4, reps: '8-10', weight: 80, rest: 120, completed: false, rpe: 0 },
    { name: String(t.workout.exercises?.inclineBench || 'Incline Bench'), sets: 4, reps: '8-10', weight: 70, rest: 120, completed: false, rpe: 0 },
    { name: String(t.workout.exercises?.flyDumbbell || 'Dumbbell Fly'), sets: 3, reps: '10-12', weight: 25, rest: 90, completed: false, rpe: 0 },
    { name: String(t.workout.exercises?.dips || 'Dips'), sets: 3, reps: '8-10', weight: 0, rest: 90, completed: false, rpe: 0 },
    { name: String(t.workout.exercises?.skullCrusher || 'Skull Crusher'), sets: 3, reps: '10-12', weight: 35, rest: 90, completed: false, rpe: 0 },
    { name: String(t.workout.exercises?.tricepsRope || 'Triceps Rope'), sets: 3, reps: '12-15', weight: 40, rest: 60, completed: false, rpe: 0 }
  ]
})

const getMockMeals = (t: any) => [
  { name: t.diet.meals.breakfast, calories: 450, protein: 25, carbs: 45, fat: 18, completed: true },
  { name: t.diet.meals.morningSnack, calories: 200, protein: 20, carbs: 15, fat: 8, completed: true },
  { name: t.diet.meals.lunch, calories: 650, protein: 45, carbs: 60, fat: 22, completed: true },
  { name: t.diet.meals.afternoonSnack, calories: 300, protein: 25, carbs: 20, fat: 12, completed: false },
  { name: t.diet.meals.dinner, calories: 550, protein: 40, carbs: 35, fat: 20, completed: false },
  { name: t.diet.meals.supper, calories: 250, protein: 20, carbs: 15, fat: 12, completed: false }
]

export default function FitApp() {
  const { t, language } = useLanguage()
  const [currentScreen, setCurrentScreen] = useState('onboarding')
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [restTimer, setRestTimer] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [workoutData, setWorkoutData] = useState(getMockWorkout(t))
  const [userPlan, setUserPlan] = useState('basic')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [meals, setMeals] = useState(getMockMeals(t))

  // Update workout and meals when language changes
  useEffect(() => {
    setWorkoutData(getMockWorkout(t))
    setMeals(getMockMeals(t))
  }, [language, t])

  // Onboarding state - UPDATED with all required fields
  const [onboardingData, setOnboardingData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    sex: '',
    goal: '',
    level: '',
    daysPerWeek: '',
    sessionTime: '',
    equipment: '',
    favoriteFoods: '',
    dislikedFoods: '',
    restrictions: ''
  })

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('fitapp-onboarding')
    const savedPlan = localStorage.getItem('fitapp-plan') || 'basic'
    setUserPlan(savedPlan)
    
    if (hasCompletedOnboarding) {
      setIsFirstTime(false)
      setCurrentScreen('dashboard')
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1)
      }, 1000)
    } else if (restTimer === 0) {
      setIsResting(false)
    }
    return () => clearInterval(interval)
  }, [isResting, restTimer])

  const completeOnboarding = () => {
    localStorage.setItem('fitapp-onboarding', 'true')
    localStorage.setItem('fitapp-user-data', JSON.stringify(onboardingData))
    setIsFirstTime(false)
    setCurrentScreen('dashboard')
  }

  const startRestTimer = (seconds: number) => {
    setRestTimer(seconds)
    setIsResting(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const updateExercise = (index: number, field: string, value: any) => {
    const updated = { ...workoutData }
    updated.exercises[index] = { ...updated.exercises[index], [field]: value }
    setWorkoutData(updated)
  }

  const checkFeatureAccess = (feature: string) => {
    const proFeatures = [
      'unlimited-workout-updates',
      'unlimited-diet-updates',
      'frequent-checkins',
      'photo-comparison',
      'motivational-messages',
      'ai-chat',
      'full-library',
      'workout-history',
      'badges',
      'pdf-download'
    ]
    
    if (userPlan === 'pro') return true
    if (proFeatures.includes(feature)) {
      setShowUpgradeModal(true)
      return false
    }
    return true
  }

  const canUpdateWorkout = () => {
    if (userPlan === 'pro') return true
    const lastUpdate = new Date('2024-01-01')
    const daysSinceUpdate = Math.floor((Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))
    return daysSinceUpdate >= 30
  }

  const canUpdateDiet = () => {
    if (userPlan === 'pro') return true
    const lastUpdate = new Date('2024-01-01')
    const daysSinceUpdate = Math.floor((Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))
    return daysSinceUpdate >= 30
  }

  const canCheckIn = () => {
    if (userPlan === 'pro') return true
    const lastCheckIn = new Date('2024-01-01')
    const daysSinceCheckIn = Math.floor((Date.now() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24))
    return daysSinceCheckIn >= 30
  }

  // Upgrade Modal
  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#11161E] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#1A1F2E]">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{t.plans.upgradeToPro}</h2>
                <p className="text-[#9AA8B2] text-sm">{t.plans.unlockPotential}</p>
              </div>
            </div>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="w-8 h-8 bg-[#0B0F14] rounded-xl flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 rotate-45" />
            </button>
          </div>

          {/* Current Plan */}
          <div className="bg-[#0B0F14] p-4 rounded-2xl border border-[#1A1F2E] mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#9AA8B2]">{t.plans.current}</span>
              <span className="text-sm font-medium">{t.plans.basic}</span>
            </div>
            <div className="text-xs text-[#9AA8B2]">
              {t.plans.basicDescription}
            </div>
          </div>

          {/* Pro Features */}
          <div className="space-y-3 mb-6">
            <h3 className="font-bold text-lg mb-4">{t.plans.proFeatures}</h3>
            {[
              { icon: Zap, text: t.plans.features.unlimitedWorkouts },
              { icon: Apple, text: t.plans.features.unlimitedDiet },
              { icon: Calendar, text: t.plans.features.frequentCheckins },
              { icon: TrendingUp, text: t.plans.features.fullReport },
              { icon: Camera, text: t.plans.features.photoComparison },
              { icon: MessageCircle, text: t.plans.features.motivationalMessages },
              { icon: MessageCircle, text: t.plans.features.aiChat },
              { icon: Book, text: t.plans.features.fullLibrary },
              { icon: Activity, text: t.plans.features.workoutHistory },
              { icon: Award, text: t.plans.features.badges },
              { icon: Download, text: t.plans.features.pdfDownload }
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F97316]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-[#F97316]" />
                </div>
                <p className="text-sm text-[#E6EBF2] pt-1">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-[#F97316]/10 to-[#EA580C]/5 p-6 rounded-2xl border border-[#F97316]/20 mb-6">
            <div className="text-center mb-4">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-[#F97316]">R$ 29,90</span>
                <span className="text-[#9AA8B2]">{t.plans.perMonth}</span>
              </div>
              <p className="text-sm text-[#9AA8B2]">{t.plans.cancelAnytime}</p>
            </div>
            <button className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white py-4 rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#F97316]/25">
              {t.plans.subscribe}
            </button>
          </div>

          <p className="text-xs text-center text-[#9AA8B2]">
            {t.plans.terms}
          </p>
        </div>
      </div>
    </div>
  )

  // Onboarding Component - COMPLETELY UPDATED
  const OnboardingScreen = () => {
    const steps = [
      // Step 0: Personal Info
      {
        title: language === 'pt' ? 'Informações Pessoais' : 'Personal Information',
        type: 'form',
        fields: [
          { name: 'name', label: language === 'pt' ? 'Nome' : 'Name', type: 'text', placeholder: language === 'pt' ? 'Seu nome completo' : 'Your full name' },
          { name: 'age', label: language === 'pt' ? 'Idade' : 'Age', type: 'number', placeholder: language === 'pt' ? 'Sua idade' : 'Your age' },
          { name: 'height', label: language === 'pt' ? 'Altura (cm)' : 'Height (cm)', type: 'number', placeholder: '175' },
          { name: 'weight', label: language === 'pt' ? 'Peso (kg)' : 'Weight (kg)', type: 'number', placeholder: '75' }
        ]
      },
      // Step 1: Sex
      {
        title: language === 'pt' ? 'Sexo' : 'Sex',
        options: [language === 'pt' ? 'Masculino' : 'Male', language === 'pt' ? 'Feminino' : 'Female'],
        field: 'sex'
      },
      // Step 2: Goal
      {
        title: t.onboarding.goal.title,
        options: [
          language === 'pt' ? 'Perder Gordura' : 'Lose Fat',
          language === 'pt' ? 'Ganhar Massa' : 'Gain Muscle',
          language === 'pt' ? 'Recomposição Corporal' : 'Body Recomposition'
        ],
        field: 'goal'
      },
      // Step 3: Level
      {
        title: t.onboarding.level.title,
        options: [
          language === 'pt' ? 'Iniciante' : 'Beginner',
          language === 'pt' ? 'Intermediário' : 'Intermediate',
          language === 'pt' ? 'Avançado' : 'Advanced'
        ],
        field: 'level'
      },
      // Step 4: Days per week
      {
        title: language === 'pt' ? 'Quantos dias por semana você pode treinar?' : 'How many days per week can you train?',
        options: ['3', '4', '5', '6'],
        field: 'daysPerWeek'
      },
      // Step 5: Session time
      {
        title: language === 'pt' ? 'Quanto tempo por treino?' : 'How much time per workout?',
        options: [
          language === 'pt' ? '30-45 minutos' : '30-45 minutes',
          language === 'pt' ? '45-60 minutos' : '45-60 minutes',
          language === 'pt' ? '60-90 minutos' : '60-90 minutes',
          language === 'pt' ? 'Mais de 90 minutos' : 'More than 90 minutes'
        ],
        field: 'sessionTime'
      },
      // Step 6: Equipment
      {
        title: language === 'pt' ? 'Tipo de treino' : 'Training type',
        options: [
          language === 'pt' ? 'Academia Completa' : 'Full Gym',
          language === 'pt' ? 'Academia Pequena' : 'Small Gym',
          language === 'pt' ? 'Home Gym' : 'Home Gym',
          language === 'pt' ? 'Apenas Peso Corporal' : 'Bodyweight Only'
        ],
        field: 'equipment'
      },
      // Step 7: Food Preferences
      {
        title: language === 'pt' ? 'Preferências Alimentares' : 'Food Preferences',
        type: 'form',
        fields: [
          { name: 'favoriteFoods', label: language === 'pt' ? 'Alimentos Favoritos' : 'Favorite Foods', type: 'text', placeholder: language === 'pt' ? 'Ex: frango, arroz, batata doce' : 'Ex: chicken, rice, sweet potato' },
          { name: 'dislikedFoods', label: language === 'pt' ? 'Alimentos que não gosta' : 'Disliked Foods', type: 'text', placeholder: language === 'pt' ? 'Ex: brócolis, peixe' : 'Ex: broccoli, fish' },
          { name: 'restrictions', label: language === 'pt' ? 'Restrições Alimentares' : 'Dietary Restrictions', type: 'text', placeholder: language === 'pt' ? 'Ex: lactose, glúten, vegetariano' : 'Ex: lactose, gluten, vegetarian' }
        ]
      }
    ]

    const currentStep = steps[onboardingStep]

    const isStepValid = () => {
      if (currentStep.type === 'form') {
        return currentStep.fields.every(field => 
          onboardingData[field.name as keyof typeof onboardingData]?.toString().trim() !== ''
        )
      }
      return onboardingData[currentStep.field as keyof typeof onboardingData] !== ''
    }

    return (
      <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2] p-6 flex flex-col">
        {/* Language Selector - Top Right */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl flex items-center justify-center">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">{t.appName}</h1>
            <p className="text-[#9AA8B2] text-center">{t.appTagline}</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 mx-1 rounded-full transition-colors duration-300 ${
                    index <= onboardingStep ? 'bg-[#F97316]' : 'bg-[#11161E]'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[#9AA8B2] text-center">
              {t.onboarding.step} {onboardingStep + 1} {t.onboarding.of} {steps.length}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{currentStep.title}</h2>
            
            {/* Form Type */}
            {currentStep.type === 'form' ? (
              <div className="space-y-4">
                {currentStep.fields?.map((field, index) => (
                  <div key={index}>
                    <label className="text-sm text-[#9AA8B2] mb-2 block">{field.label}</label>
                    <input
                      type={field.type}
                      value={onboardingData[field.name as keyof typeof onboardingData]}
                      onChange={(e) => {
                        const newValue = e.target.value
                        setOnboardingData(prev => ({ ...prev, [field.name]: newValue }))
                      }}
                      placeholder={field.placeholder}
                      className="w-full p-4 rounded-2xl border-2 border-[#11161E] bg-[#11161E]/50 focus:border-[#F97316] focus:outline-none transition-all duration-200 text-[#E6EBF2]"
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Options Type */
              <div className="space-y-3">
                {currentStep.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setOnboardingData(prev => ({ ...prev, [currentStep.field]: option }))
                    }}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                      onboardingData[currentStep.field as keyof typeof onboardingData] === option
                        ? 'border-[#F97316] bg-[#F97316]/10'
                        : 'border-[#11161E] bg-[#11161E]/50 hover:border-[#F97316]/50'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          {onboardingStep > 0 && (
            <button
              onClick={() => setOnboardingStep(prev => prev - 1)}
              className="flex-1 py-4 px-6 rounded-2xl border border-[#11161E] text-[#9AA8B2] font-medium transition-colors duration-200 hover:border-[#F97316]/50"
            >
              {t.back}
            </button>
          )}
          <button
            onClick={() => {
              if (onboardingStep < steps.length - 1) {
                setOnboardingStep(prev => prev + 1)
              } else {
                completeOnboarding()
              }
            }}
            disabled={!isStepValid()}
            className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#F97316]/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {onboardingStep < steps.length - 1 ? t.continue : t.finish}
          </button>
        </div>
      </div>
    )
  }

  // Dashboard Component
  const DashboardScreen = () => {
    const userData = JSON.parse(localStorage.getItem('fitapp-user-data') || '{}')
    
    return (
      <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{t.dashboard.greeting}, {userData.name || 'User'}! 👋</h1>
              <p className="text-[#9AA8B2]">{t.dashboard.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              {userPlan === 'basic' && (
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="flex items-center gap-1 bg-gradient-to-r from-[#F97316] to-[#EA580C] px-3 py-2 rounded-xl"
                >
                  <Crown className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">{t.plans.pro}</span>
                </button>
              )}
              <div className="flex items-center gap-1 bg-[#11161E] px-3 py-2 rounded-xl">
                <Flame className="w-4 h-4 text-[#F97316]" />
                <span className="text-sm font-medium">12</span>
              </div>
              <button
                onClick={() => setCurrentScreen('profile')}
                className="w-10 h-10 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-xl flex items-center justify-center"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Plan Badge */}
          {userPlan === 'basic' && (
            <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#9AA8B2]" />
                  <div>
                    <p className="font-medium">{t.plans.basic}</p>
                    <p className="text-xs text-[#9AA8B2]">{t.plans.limitedResources}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl text-sm font-medium"
                >
                  {t.plans.upgrade}
                </button>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E]">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-5 h-5 text-[#F97316]" />
                <span className="text-xs text-[#9AA8B2]">{t.dashboard.calories}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">1850</span>
                <span className="text-sm text-[#9AA8B2]">/2200</span>
              </div>
              <div className="w-full bg-[#0B0F14] rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-[#F97316] to-[#EA580C] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(1850 / 2200) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E]">
              <div className="flex items-center justify-between mb-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                <span className="text-xs text-[#9AA8B2]">{t.dashboard.water}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">6</span>
                <span className="text-sm text-[#9AA8B2]">/8</span>
              </div>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${
                      i < 6 ? 'bg-blue-400' : 'bg-[#0B0F14]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Today's Workout */}
          <div className="bg-gradient-to-br from-[#F97316]/10 to-[#EA580C]/5 p-6 rounded-2xl border border-[#F97316]/20 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#F97316]">{t.dashboard.todayWorkout}</h3>
                <p className="text-[#9AA8B2]">{workoutData.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#9AA8B2]">6 {t.dashboard.exercises}</p>
                <p className="text-sm text-[#9AA8B2]">75 {t.dashboard.min}</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentScreen('workout')}
              className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-[#F97316]/25"
            >
              <Play className="w-5 h-5" />
              {t.dashboard.startWorkout}
            </button>
            {!canUpdateWorkout() && (
              <p className="text-xs text-[#9AA8B2] text-center mt-2">
                {t.dashboard.nextUpdateIn} {30 - Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24))} {t.dashboard.days}
              </p>
            )}
          </div>

          {/* Macros */}
          <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
            <h3 className="text-lg font-bold mb-4">{t.dashboard.macros}</h3>
            <div className="space-y-4">
              {[
                { name: t.dashboard.protein, consumed: 120, target: 165, color: 'green-500' },
                { name: t.dashboard.carbs, consumed: 180, target: 275, color: 'blue-500' },
                { name: t.dashboard.fat, consumed: 65, target: 85, color: 'yellow-500' }
              ].map((macro, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#9AA8B2]">{macro.name}</span>
                    <span className="text-sm">{macro.consumed}g / {macro.target}g</span>
                  </div>
                  <div className="w-full bg-[#0B0F14] rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 bg-${macro.color}`}
                      style={{ width: `${Math.min((macro.consumed / macro.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supplementation Section - NEW */}
          <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-bold">{language === 'pt' ? 'Suplementação Opcional' : 'Optional Supplementation'}</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-[#0B0F14] p-4 rounded-xl">
                <h4 className="font-medium mb-1">{language === 'pt' ? 'Whey Protein' : 'Whey Protein'}</h4>
                <p className="text-sm text-[#9AA8B2]">{language === 'pt' ? '30g após o treino' : '30g post-workout'}</p>
              </div>
              <div className="bg-[#0B0F14] p-4 rounded-xl">
                <h4 className="font-medium mb-1">{language === 'pt' ? 'Creatina' : 'Creatine'}</h4>
                <p className="text-sm text-[#9AA8B2]">{language === 'pt' ? '5g por dia' : '5g daily'}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <p className="text-xs text-yellow-500">
                {language === 'pt' 
                  ? '⚠️ Consulte um médico ou nutricionista antes de iniciar qualquer suplementação.' 
                  : '⚠️ Consult a doctor or nutritionist before starting any supplementation.'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentScreen('diet')}
              className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] flex flex-col items-center gap-2 transition-all duration-200 hover:border-[#F97316]/50"
            >
              <Apple className="w-6 h-6 text-[#F97316]" />
              <span className="text-sm font-medium">{t.dashboard.diet}</span>
            </button>
            <button
              onClick={() => {
                if (userPlan === 'basic') {
                  setShowUpgradeModal(true)
                } else {
                  setCurrentScreen('progress')
                }
              }}
              className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] flex flex-col items-center gap-2 transition-all duration-200 hover:border-[#F97316]/50 relative"
            >
              {userPlan === 'basic' && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4 text-[#9AA8B2]" />
                </div>
              )}
              <TrendingUp className="w-6 h-6 text-[#F97316]" />
              <span className="text-sm font-medium">{t.dashboard.progress}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Workout Screen
  const WorkoutScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold">{workoutData.name}</h1>
            <p className="text-[#9AA8B2] text-sm">6 {t.workout?.exercises || 'exercises'} • 75 {t.workout?.min || 'min'}</p>
          </div>
          <button 
            onClick={() => {
              if (canUpdateWorkout()) {
                // Atualizar treino
              } else {
                setShowUpgradeModal(true)
              }
            }}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Rest Timer */}
        {isResting && (
          <div className="bg-gradient-to-br from-[#F97316]/10 to-[#EA580C]/5 p-6 rounded-2xl border border-[#F97316]/20 mb-6">
            <div className="text-center">
              <Timer className="w-8 h-8 text-[#F97316] mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-[#F97316]">{formatTime(restTimer)}</h3>
              <p className="text-[#9AA8B2]">{t.workout?.restTime || 'Rest Time'}</p>
              <button
                onClick={() => setIsResting(false)}
                className="mt-4 px-6 py-2 bg-[#F97316] text-white rounded-xl text-sm font-medium"
              >
                {t.workout?.skipRest || 'Skip Rest'}
              </button>
            </div>
          </div>
        )}

        {/* Exercises */}
        <div className="space-y-4">
          {workoutData.exercises.map((exercise, index) => (
            <div key={index} className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{exercise.name}</h3>
                  <p className="text-[#9AA8B2] text-sm">{exercise.sets} {t.workout?.sets || 'sets'} • {exercise.reps} {t.workout?.reps || 'reps'}</p>
                </div>
                <button
                  onClick={() => updateExercise(index, 'completed', !exercise.completed)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    exercise.completed 
                      ? 'border-[#F97316] bg-[#F97316] text-white' 
                      : 'border-[#9AA8B2] hover:border-[#F97316]'
                  }`}
                >
                  {exercise.completed && <CheckCircle2 className="w-5 h-5" />}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs text-[#9AA8B2] block mb-1">{t.workout.weight}</label>
                  <input
                    type="number"
                    value={exercise.weight}
                    onChange={(e) => updateExercise(index, 'weight', parseInt(e.target.value))}
                    className="w-full bg-[#0B0F14] border border-[#1A1F2E] rounded-xl px-3 py-2 text-center font-medium focus:border-[#F97316] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#9AA8B2] block mb-1">{t.workout.rpe}</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={exercise.rpe || ''}
                    onChange={(e) => updateExercise(index, 'rpe', parseInt(e.target.value))}
                    className="w-full bg-[#0B0F14] border border-[#1A1F2E] rounded-xl px-3 py-2 text-center font-medium focus:border-[#F97316] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#9AA8B2] block mb-1">{t.workout.rest}</label>
                  <button
                    onClick={() => startRestTimer(exercise.rest)}
                    className="w-full bg-[#F97316] text-white rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-[#EA580C]"
                  >
                    {exercise.rest}s
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-[#0B0F14] border border-[#1A1F2E] text-[#9AA8B2] py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:border-[#F97316]/50">
                  {t.workout.watchVideo}
                </button>
                <button 
                  onClick={() => {
                    if (!checkFeatureAccess('workout-history')) return
                  }}
                  className="flex-1 bg-[#0B0F14] border border-[#1A1F2E] text-[#9AA8B2] py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:border-[#F97316]/50 relative"
                >
                  {userPlan === 'basic' && <Lock className="w-3 h-3 absolute top-1 right-1" />}
                  {t.workout.history}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pb-6 space-y-3">
          <button className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white py-4 rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#F97316]/25">
            {t.workout.finishWorkout}
          </button>
          <button
            onClick={() => {
              if (!checkFeatureAccess('pdf-download')) return
            }}
            className="w-full bg-[#11161E] border border-[#1A1F2E] text-[#E6EBF2] py-4 rounded-2xl font-medium transition-all duration-200 hover:border-[#F97316]/50 flex items-center justify-center gap-2 relative"
          >
            {userPlan === 'basic' && <Lock className="w-4 h-4 absolute left-4" />}
            <Download className="w-5 h-5" />
            {t.workout.downloadPDF}
          </button>
        </div>
      </div>
    </div>
  )

  // Diet Screen
  const DietScreen = () => {
    const userData = JSON.parse(localStorage.getItem('fitapp-user-data') || '{}')
    
    return (
      <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <h1 className="text-xl font-bold">{t.diet.title}</h1>
            <button 
              onClick={() => {
                if (canUpdateDiet()) {
                  // Atualizar dieta
                } else {
                  setShowUpgradeModal(true)
                }
              }}
              className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {!canUpdateDiet() && (
            <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] mb-6">
              <p className="text-sm text-[#9AA8B2] text-center">
                {language === 'pt' 
                  ? 'Plano Básico: Dieta gerada uma vez. Upgrade para Pro para recalcular a cada check-in.' 
                  : 'Basic Plan: Diet generated once. Upgrade to Pro to recalculate on each check-in.'}
              </p>
            </div>
          )}

          {/* User Preferences Display */}
          {userData.favoriteFoods && (
            <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] mb-6">
              <h3 className="font-bold mb-3">{language === 'pt' ? 'Suas Preferências' : 'Your Preferences'}</h3>
              <div className="space-y-2 text-sm">
                {userData.favoriteFoods && (
                  <p><span className="text-[#9AA8B2]">{language === 'pt' ? 'Favoritos:' : 'Favorites:'}</span> {userData.favoriteFoods}</p>
                )}
                {userData.dislikedFoods && (
                  <p><span className="text-[#9AA8B2]">{language === 'pt' ? 'Evitar:' : 'Avoid:'}</span> {userData.dislikedFoods}</p>
                )}
                {userData.restrictions && (
                  <p><span className="text-[#9AA8B2]">{language === 'pt' ? 'Restrições:' : 'Restrictions:'}</span> {userData.restrictions}</p>
                )}
              </div>
            </div>
          )}

          {/* Daily Summary */}
          <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#F97316]">1850</p>
                <p className="text-xs text-[#9AA8B2]">{t.dashboard.calories}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-500">120g</p>
                <p className="text-xs text-[#9AA8B2]">{t.dashboard.protein}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-500">180g</p>
                <p className="text-xs text-[#9AA8B2]">{t.dashboard.carbs}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-500">65g</p>
                <p className="text-xs text-[#9AA8B2]">{t.dashboard.fat}</p>
              </div>
            </div>
          </div>

          {/* Meals */}
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <div key={index} className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        meal.completed 
                          ? 'border-[#F97316] bg-[#F97316] text-white' 
                          : 'border-[#9AA8B2] hover:border-[#F97316]'
                      }`}
                    >
                      {meal.completed && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                    <div>
                      <h3 className="font-bold">{meal.name}</h3>
                      <p className="text-[#9AA8B2] text-sm">{meal.calories} kcal</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#9AA8B2]" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium text-green-500">{meal.protein}g</p>
                    <p className="text-xs text-[#9AA8B2]">{t.dashboard.protein}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-500">{meal.carbs}g</p>
                    <p className="text-xs text-[#9AA8B2]">{t.dashboard.carbs}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-500">{meal.fat}g</p>
                    <p className="text-xs text-[#9AA8B2]">{t.dashboard.fat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Water Tracking */}
          <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold">{t.diet.hydration}</h3>
              </div>
              <span className="text-sm text-[#9AA8B2]">6/8 {t.diet.glasses}</span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <button
                  key={i}
                  className={`flex-1 h-12 rounded-xl transition-all duration-200 ${
                    i < 6 
                      ? 'bg-blue-400 text-white' 
                      : 'bg-[#0B0F14] border border-[#1A1F2E] hover:border-blue-400/50'
                  }`}
                >
                  <Droplets className="w-5 h-5 mx-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* AI Chat Button (Pro only) */}
          <div className="mt-6">
            <button
              onClick={() => {
                if (!checkFeatureAccess('ai-chat')) return
              }}
              className="w-full bg-[#11161E] border border-[#1A1F2E] text-[#E6EBF2] py-4 rounded-2xl font-medium transition-all duration-200 hover:border-[#F97316]/50 flex items-center justify-center gap-2 relative"
            >
              {userPlan === 'basic' && <Lock className="w-4 h-4 absolute left-4" />}
              <MessageCircle className="w-5 h-5" />
              {t.diet.askAI}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Progress Screen
  const ProgressScreen = () => (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl font-bold">{t.progress.title}</h1>
          <button 
            onClick={() => {
              if (!canCheckIn()) {
                setShowUpgradeModal(true)
              }
            }}
            className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {!canCheckIn() && (
          <div className="bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] mb-6">
            <p className="text-sm text-[#9AA8B2] text-center">
              {t.progress.nextCheckinIn} {30 - Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24))} {t.dashboard.days}
            </p>
          </div>
        )}

        {/* Weight Progress */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">{t.progress.bodyWeight}</h3>
            <span className="text-[#F97316] font-bold">75.2 kg</span>
          </div>
          <div className="h-32 bg-[#0B0F14] rounded-xl p-4 flex items-end justify-between">
            {[72, 73.5, 74.2, 75.2].map((weight, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-gradient-to-t from-[#F97316] to-[#EA580C] rounded-t"
                  style={{ height: `${(weight / 80) * 100}%` }}
                />
                <span className="text-xs text-[#9AA8B2] mt-2">{weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body Measurements */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <h3 className="font-bold mb-4">{t.progress.bodyMeasurements}</h3>
          <div className="space-y-3">
            {[
              { name: t.progress.chest, value: '102 cm', change: '+2 cm' },
              { name: t.progress.arm, value: '38 cm', change: '+1 cm' },
              { name: t.progress.waist, value: '82 cm', change: '-1 cm' },
              { name: t.progress.thigh, value: '58 cm', change: '+1 cm' }
            ].map((measurement, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-[#9AA8B2]">{measurement.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{measurement.value}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    measurement.change.startsWith('+') 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {measurement.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Volume */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
          <h3 className="font-bold mb-4">{t.progress.workoutVolume}</h3>
          <div className="h-32 bg-[#0B0F14] rounded-xl p-4 flex items-end justify-between">
            {[8500, 9200, 8800, 9600].map((volume, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                  style={{ height: `${(volume / 10000) * 100}%` }}
                />
                <span className="text-xs text-[#9AA8B2] mt-2">{(volume/1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Timeline */}
        <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] relative">
          {userPlan === 'basic' && (
            <div className="absolute inset-0 bg-[#11161E]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="text-center">
                <Lock className="w-8 h-8 text-[#9AA8B2] mx-auto mb-2" />
                <p className="text-sm text-[#9AA8B2] mb-3">{t.plans.locked}</p>
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl text-sm font-medium"
                >
                  {t.plans.upgrade}
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">{t.progress.photoComparison}</h3>
            <button className="text-[#F97316] text-sm font-medium">{t.progress.viewAll}</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="aspect-square bg-[#0B0F14] rounded-xl border border-[#1A1F2E] flex items-center justify-center">
                <Camera className="w-8 h-8 text-[#9AA8B2]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Profile Screen
  const ProfileScreen = () => {
    const userData = JSON.parse(localStorage.getItem('fitapp-user-data') || '{}')
    
    return (
      <div className="min-h-screen bg-[#0B0F14] text-[#E6EBF2]">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <h1 className="text-xl font-bold">{t.profile.title}</h1>
            <button className="w-10 h-10 bg-[#11161E] rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Header */}
          <div className="bg-[#11161E] p-6 rounded-2xl border border-[#1A1F2E] mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{userData.name || 'User'}</h2>
                <p className="text-[#9AA8B2]">{userData.goal} • {userData.level}</p>
                <div className="flex items-center gap-2 mt-1">
                  {userPlan === 'pro' ? (
                    <span className="text-xs px-2 py-1 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      {t.plans.pro}
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-[#0B0F14] text-[#9AA8B2] rounded-full">
                      {t.plans.basic}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#F97316]">12</p>
                <p className="text-xs text-[#9AA8B2]">{t.profile.streak}</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.weight || '75.2'}</p>
                <p className="text-xs text-[#9AA8B2]">{t.profile.currentWeight}</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{userData.age || '25'}</p>
                <p className="text-xs text-[#9AA8B2]">{language === 'pt' ? 'Anos' : 'Years'}</p>
              </div>
            </div>
          </div>

          {/* Upgrade Card (if basic) */}
          {userPlan === 'basic' && (
            <div className="bg-gradient-to-br from-[#F97316]/10 to-[#EA580C]/5 p-6 rounded-2xl border border-[#F97316]/20 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{t.plans.upgradeToPro}</h3>
                  <p className="text-sm text-[#9AA8B2] mb-3">
                    {t.profile.upgradeDescription}
                  </p>
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white py-3 rounded-xl font-medium"
                  >
                    {t.profile.viewPlans}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Menu Options */}
          <div className="space-y-3">
            {[
              { icon: Target, label: t.profile.menu.goals, screen: 'goals', locked: false },
              { icon: Calendar, label: t.profile.menu.plan, screen: 'plan', locked: false },
              { icon: Book, label: t.profile.menu.library, screen: 'library', locked: userPlan === 'basic' },
              { icon: Award, label: t.profile.menu.badges, screen: 'badges', locked: userPlan === 'basic' },
              { icon: Activity, label: t.profile.menu.stats, screen: 'stats', locked: false },
              { icon: Settings, label: t.profile.menu.settings, screen: 'settings', locked: false }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.locked) {
                    setShowUpgradeModal(true)
                  } else {
                    setCurrentScreen(item.screen)
                  }
                }}
                className="w-full bg-[#11161E] p-4 rounded-2xl border border-[#1A1F2E] flex items-center justify-between transition-all duration-200 hover:border-[#F97316]/50"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-[#F97316]" />
                  <span className="font-medium">{item.label}</span>
                  {item.locked && <Lock className="w-4 h-4 text-[#9AA8B2]" />}
                </div>
                <ChevronRight className="w-5 h-5 text-[#9AA8B2]" />
              </button>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                localStorage.removeItem('fitapp-onboarding')
                localStorage.removeItem('fitapp-user-data')
                setCurrentScreen('onboarding')
                setOnboardingStep(0)
              }}
              className="w-full bg-red-500/10 border border-red-500/20 text-red-400 py-4 rounded-2xl font-medium transition-all duration-200 hover:bg-red-500/20"
            >
              {t.profile.resetOnboarding}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Bottom Navigation
  const BottomNav = () => {
    if (currentScreen === 'onboarding') return null

    const navItems = [
      { icon: Home, label: t.nav.home, screen: 'dashboard' },
      { icon: Dumbbell, label: t.nav.workout, screen: 'workout' },
      { icon: Apple, label: t.nav.diet, screen: 'diet' },
      { icon: BarChart3, label: t.nav.progress, screen: 'progress' },
      { icon: User, label: t.nav.profile, screen: 'profile' }
    ]

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#11161E] border-t border-[#1A1F2E] px-6 py-4">
        <div className="flex justify-between">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen(item.screen)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                currentScreen === item.screen 
                  ? 'text-[#F97316]' 
                  : 'text-[#9AA8B2] hover:text-[#F97316]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen />
      case 'dashboard':
        return <DashboardScreen />
      case 'workout':
        return <WorkoutScreen />
      case 'diet':
        return <DietScreen />
      case 'progress':
        return <ProgressScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <DashboardScreen />
    }
  }

  return (
    <div className="font-inter">
      {renderScreen()}
      <BottomNav />
      {currentScreen !== 'onboarding' && <div className="h-20" />}
      {showUpgradeModal && <UpgradeModal />}
    </div>
  )
}
