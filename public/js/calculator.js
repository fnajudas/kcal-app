/**
 * Calculator Module
 * Handles BMI and TDEE (Total Daily Energy Expenditure) calculations
 */

const Calculator = {
    // BMI Categories with ranges
    BMI_CATEGORIES: {
        UNDERWEIGHT: { min: 0, max: 18.5, label: 'Underweight', color: 'underweight' },
        NORMAL: { min: 18.5, max: 25, label: 'Normal', color: 'normal' },
        OVERWEIGHT: { min: 25, max: 30, label: 'Overweight', color: 'overweight' },
        OBESE: { min: 30, max: 100, label: 'Obese', color: 'obese' }
    },

    // Activity level multipliers
    ACTIVITY_LEVELS: {
        '1.2': 'Sedentary',
        '1.375': 'Light',
        '1.55': 'Moderate',
        '1.725': 'Active',
        '1.9': 'Very Active'
    },

    /**
     * Calculate BMI (Body Mass Index)
     * Formula: weight (kg) / height (m)²
     * @param {number} weight - Weight in kg
     * @param {number} height - Height in cm
     * @returns {number} BMI value rounded to 1 decimal
     */
    calculateBMI(weight, height) {
        if (!weight || !height || weight <= 0 || height <= 0) {
            return 0;
        }
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return Math.round(bmi * 10) / 10;
    },

    /**
     * Get BMI category based on BMI value
     * @param {number} bmi - BMI value
     * @returns {Object} Category object with label and color
     */
    getBMICategory(bmi) {
        if (bmi < 18.5) {
            return this.BMI_CATEGORIES.UNDERWEIGHT;
        } else if (bmi < 25) {
            return this.BMI_CATEGORIES.NORMAL;
        } else if (bmi < 30) {
            return this.BMI_CATEGORIES.OVERWEIGHT;
        } else {
            return this.BMI_CATEGORIES.OBESE;
        }
    },

    /**
     * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
     * Male: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5
     * Female: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161
     * @param {number} weight - Weight in kg
     * @param {number} height - Height in cm
     * @param {number} age - Age in years
     * @param {string} gender - 'male' or 'female'
     * @returns {number} BMR in kcal/day
     */
    calculateBMR(weight, height, age, gender) {
        if (!weight || !height || !age || !gender) {
            return 0;
        }

        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        return Math.round(bmr);
    },

    /**
     * Calculate TDEE (Total Daily Energy Expenditure)
     * TDEE = BMR × Activity Multiplier
     * @param {number} bmr - Basal Metabolic Rate
     * @param {number} activityMultiplier - Activity level multiplier (1.2 - 1.9)
     * @returns {number} TDEE in kcal/day
     */
    calculateTDEE(bmr, activityMultiplier) {
        if (!bmr || !activityMultiplier) {
            return 0;
        }
        return Math.round(bmr * activityMultiplier);
    },

    /**
     * Calculate all values from profile data
     * @param {Object} profile - User profile with weight, height, age, gender, activity
     * @returns {Object} Object containing bmi, bmiCategory, bmr, tdee
     */
    calculateAll(profile) {
        const { weight, height, age, gender, activity } = profile;
        
        const bmi = this.calculateBMI(weight, height);
        const bmiCategory = this.getBMICategory(bmi);
        const bmr = this.calculateBMR(weight, height, age, gender);
        const tdee = this.calculateTDEE(bmr, parseFloat(activity));

        return {
            bmi,
            bmiCategory,
            bmr,
            tdee
        };
    },

    /**
     * Get position for BMI indicator on scale (0-100%)
     * Scale: 15-35 BMI range displayed
     * @param {number} bmi - BMI value
     * @returns {number} Position percentage (0-100)
     */
    getBMIIndicatorPosition(bmi) {
        const minBMI = 15;
        const maxBMI = 35;
        
        // Clamp BMI to display range
        const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
        
        // Calculate percentage
        const position = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
        
        return position;
    },

    /**
     * Calculate ideal weight range for a given height
     * Based on BMI 18.5-24.9 (normal range)
     * @param {number} height - Height in cm
     * @returns {Object} Object with min and max ideal weight
     */
    getIdealWeightRange(height) {
        const heightInMeters = height / 100;
        const heightSquared = heightInMeters * heightInMeters;
        
        return {
            min: Math.round(18.5 * heightSquared * 10) / 10,
            max: Math.round(24.9 * heightSquared * 10) / 10
        };
    },

    // Goal types with calorie adjustments
    GOAL_TYPES: {
        'aggressive-deficit': { label: 'Turun Cepat (-750 kcal)', adjustment: -750, weeklyChange: -0.75 },
        'deficit': { label: 'Turun Berat (-500 kcal)', adjustment: -500, weeklyChange: -0.5 },
        'mild-deficit': { label: 'Turun Perlahan (-250 kcal)', adjustment: -250, weeklyChange: -0.25 },
        'maintenance': { label: 'Jaga Berat (0)', adjustment: 0, weeklyChange: 0 },
        'mild-surplus': { label: 'Naik Perlahan (+250 kcal)', adjustment: 250, weeklyChange: 0.25 },
        'surplus': { label: 'Naik Berat (+500 kcal)', adjustment: 500, weeklyChange: 0.5 }
    },

    /**
     * Calculate target calories based on goal
     * @param {number} tdee - Total Daily Energy Expenditure
     * @param {string} goalType - Goal type key
     * @param {number} customCalories - Custom calorie target (optional)
     * @returns {number} Target calories
     */
    calculateTargetCalories(tdee, goalType, customCalories = null) {
        if (customCalories && customCalories > 0) {
            return customCalories;
        }
        
        const goal = this.GOAL_TYPES[goalType] || this.GOAL_TYPES['maintenance'];
        return Math.max(1200, tdee + goal.adjustment); // Minimum 1200 kcal for safety
    },

    /**
     * Estimate time to reach goal weight
     * @param {number} currentWeight - Current weight in kg
     * @param {number} targetWeight - Target weight in kg
     * @param {string} goalType - Goal type key
     * @returns {Object} { weeks, months, targetDate }
     */
    estimateGoalTime(currentWeight, targetWeight, goalType) {
        const goal = this.GOAL_TYPES[goalType];
        if (!goal || goal.weeklyChange === 0) {
            return null;
        }
        
        const weightDiff = targetWeight - currentWeight;
        
        // Check if goal type matches weight direction
        if ((weightDiff < 0 && goal.weeklyChange > 0) || 
            (weightDiff > 0 && goal.weeklyChange < 0)) {
            return { error: 'Goal type doesn\'t match target weight direction' };
        }
        
        const weeks = Math.abs(weightDiff / goal.weeklyChange);
        const months = weeks / 4.33;
        
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + (weeks * 7));
        
        return {
            weeks: Math.round(weeks),
            months: Math.round(months * 10) / 10,
            targetDate: targetDate.toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }),
            weeklyChange: goal.weeklyChange
        };
    },

    /**
     * Get recommended water intake (in glasses, 1 glass = 250ml)
     * Based on weight: 30-35ml per kg body weight
     * @param {number} weight - Weight in kg
     * @returns {Object} { glasses, liters }
     */
    getRecommendedWater(weight) {
        const mlPerKg = 33; // middle value
        const totalMl = weight * mlPerKg;
        const glasses = Math.round(totalMl / 250);
        const liters = Math.round(totalMl / 100) / 10;
        
        return { glasses, liters, ml: Math.round(totalMl) };
    },

    /**
     * Get calorie status message based on consumption
     * @param {number} consumed - Calories consumed
     * @param {number} target - Target calories (TDEE)
     * @returns {Object} Status object with icon, message, and type
     */
    getCalorieStatus(consumed, target) {
        const percentage = (consumed / target) * 100;
        const remaining = target - consumed;

        if (consumed === 0) {
            return {
                icon: '🍽️',
                message: 'Mulai catat makananmu!',
                type: 'default'
            };
        } else if (percentage < 50) {
            return {
                icon: '💪',
                message: `Masih ada ${remaining} kcal lagi. Tetap semangat!`,
                type: 'default'
            };
        } else if (percentage < 80) {
            return {
                icon: '👍',
                message: `Bagus! Sisa ${remaining} kcal lagi.`,
                type: 'default'
            };
        } else if (percentage < 100) {
            return {
                icon: '🎯',
                message: `Hampir tercapai! Sisa ${remaining} kcal.`,
                type: 'warning'
            };
        } else if (percentage === 100) {
            return {
                icon: '🎉',
                message: 'Target kalori tercapai!',
                type: 'default'
            };
        } else {
            const over = consumed - target;
            return {
                icon: '⚠️',
                message: `Kelebihan ${over} kcal dari target!`,
                type: 'danger'
            };
        }
    }
};

// Make Calculator available globally
window.Calculator = Calculator;
