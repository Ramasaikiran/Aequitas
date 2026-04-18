export const sepsisMockData = {
  modelName: "Sepsis Risk Predictor",
  currentVersion: "v2.1.4",
  lastAudited: "2026-04-12",
  status: "Critical Bias",
  datasetName: "MIMIC-III Clinical Subset",
  recordsAnalyzed: 45200,
  overallAccuracy: 88.4,
  
  // Audit History for Timeline
  auditHistory: [
    { version: "v2.1.0", date: "2026-01-15", score: 38, status: "Critical" },
    { version: "v2.1.2", date: "2026-02-28", score: 40, status: "Critical" },
    { version: "v2.1.4", date: "2026-04-12", score: 42, status: "Critical" },
  ],

  // Models in Project
  projectModels: [
    { name: "Sepsis Risk Predictor", versions: 12, lastActive: "2h ago" },
    { name: "Readmission Risk", versions: 5, lastActive: "3d ago" },
    { name: "Dermatology Classifier", versions: 8, lastActive: "1w ago" },
  ],

  // The 5 Fairness Metrics
  fairnessMetrics: [
    { 
      name: "Demographic Parity", 
      value: 0.65, 
      status: "fail", 
      description: "Measures if the model predicts 'High Risk' at the same rate for all groups.",
      explanation: "Imagine a robot teacher giving out gold stars. If it gives stars to 10 kids from one neighborhood but only 2 from another, that's bad parity."
    },
    { 
      name: "Equalized Odds", 
      value: 0.42, 
      status: "critical", 
      description: "Measures if the model's accuracy (specifically FNR and FPR) is the same across groups.",
      explanation: "If the robot teacher makes more mistakes grading one group's homework than another's, it's not fair odds."
    },
    { 
      name: "Predictive Parity", 
      value: 0.88, 
      status: "pass", 
      description: "Measures if a 'High Risk' score means the same thing for everyone.",
      explanation: "If a gold star means 'Good Job' for one kid but 'Okay Job' for another, that's not predictive parity."
    },
    { 
      name: "Individual Fairness", 
      value: 0.72, 
      status: "warning", 
      description: "Measures if similar individuals receive similar predictions.",
      explanation: "Two kids who did the exact same work should get the exact same grade."
    },
    { 
      name: "Calibration by Group", 
      value: 0.78, 
      status: "warning", 
      description: "Measures if the predicted probability matches the actual outcome rate for each group.",
      explanation: "If the robot says there's a 50% chance of rain, it should actually rain half the time for everyone."
    }
  ],

  // False Negative Rate (FNR) - The critical metric for this use case
  fnrDisparity: [
    { demographic: "White", fnr: 11.2, count: 28000, color: "#94a3b8" },
    { demographic: "Asian", fnr: 13.5, count: 4200, color: "#64748b" },
    { demographic: "Hispanic", fnr: 21.8, count: 5500, color: "#f59e0b" },
    { demographic: "Black", fnr: 29.4, count: 7500, color: "#ef4444" },
  ],

  // Simulation Data (Before vs After Remediation)
  simulation: {
    before: { fnrGap: 18.2, fairnessScore: 42 },
    after: { fnrGap: 4.5, fairnessScore: 88 }
  },

  // Proxy variables detected
  proxyVariables: [
    {
      feature: "Insurance_Type",
      correlation: 0.82,
      protectedAttribute: "Race",
      impact: "High",
      description: "Model heavily relies on 'Medicaid' vs 'Private' insurance, which strongly correlates with race in this dataset."
    },
    {
      feature: "Zip_Code_Prefix",
      correlation: 0.68,
      protectedAttribute: "Race",
      impact: "Medium",
      description: "First 3 digits of zip code act as a geographic proxy for demographic groups."
    },
    {
      feature: "Prior_Care_Cost",
      correlation: 0.55,
      protectedAttribute: "Race/SES",
      impact: "Medium",
      description: "Uses historical healthcare spending as a proxy for health need, penalizing historically under-resourced groups."
    }
  ],

  // Remediation suggestions
  remediations: [
    {
      id: "rem-1",
      title: "Feature Dropping (Recommended)",
      description: "Remove 'Insurance_Type' and 'Prior_Care_Cost' from the training set. These features do not represent physiological risk of sepsis.",
      effort: "Low",
      impact: "High"
    },
    {
      id: "rem-2",
      title: "Adversarial Debiasing",
      description: "Train a secondary discriminator network to predict the protected attribute (Race) from the model's internal representations, penalizing the main model if it succeeds.",
      effort: "High",
      impact: "High"
    },
    {
      id: "rem-3",
      title: "Threshold Adjustment",
      description: "Lower the risk score threshold for triggering a sepsis alert specifically for Black and Hispanic patient cohorts to equalize the False Negative Rate.",
      effort: "Medium",
      impact: "Medium"
    }
  ]
};
