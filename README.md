Aequitas – Fairness & Bias Detection in Machine Learning

Aequitas is a machine learning fairness auditing system designed to detect, analyze, and mitigate bias in predictive models.

This project focuses on evaluating how ML models behave across different demographic groups and ensures ethical, transparent, and fair AI decisions.

📌 Problem Statement

Machine learning models often inherit bias from data, leading to unfair outcomes across groups (e.g., gender, caste, income level).

This project solves:

⚠️ Hidden bias in ML predictions
⚠️ Lack of fairness evaluation tools
⚠️ Difficulty in comparing group-level model performance
💡 Solution

Aequitas provides a pipeline to:

Audit model predictions
Measure fairness across sensitive attributes
Visualize disparities
Apply bias mitigation techniques

It enables data scientists and researchers to build more responsible AI systems.

🧠 Key Features
📊 Bias Auditing
Analyze model predictions using fairness metrics
📈 Fairness Metrics
TPR, FPR, Precision, Accuracy, etc.
📉 Disparity Analysis
Compare performance across groups
🛠 Bias Mitigation
Pre-processing, in-processing, post-processing methods
📊 Visualization
Graphs and disparity plots for better insights
🔁 Experimentation Framework
Run multiple fairness-aware experiments
⚙️ Tech Stack
Language: Python
Libraries:
Pandas
NumPy
Scikit-learn
Matplotlib / Seaborn
Framework: Fair ML (Aequitas-based concepts)
📂 Project Structure
Aequitas/
│── datasets/            # Sample datasets
│── src/                 # Core logic
│── experiments/         # Fairness experiments
│── notebooks/           # Jupyter notebooks
│── tests/               # Unit tests
│── requirements.txt
│── README.md
🚀 Installation
git clone https://github.com/Ramasaikiran/Aequitas.git
cd Aequitas
pip install -r requirements.txt
▶️ Usage
1. Load Dataset
import pandas as pd

df = pd.read_csv("data.csv")
2. Run Bias Audit
from aequitas import Audit

audit = Audit(df)
audit.summary_plot(["tpr", "fpr", "pprev"])
3. Visualize Disparities
audit.disparity_plot(attribute="gender", metrics=["fpr"])
📊 Example Output
Group-wise fairness metrics
Disparity graphs
Bias insights across sensitive attributes
🧪 Fairness Metrics Explained
TPR (True Positive Rate) → Model correctly identifies positives
FPR (False Positive Rate) → Wrong positive predictions
Precision → Accuracy of positive predictions
Accuracy → Overall performance

These metrics are compared across groups to detect bias.

🔬 Bias Mitigation Techniques
Pre-processing
Data balancing
Feature suppression
In-processing
Fairness-aware models
Post-processing
Threshold adjustment per group
📈 Use Cases
🏦 Loan approval systems
🏥 Healthcare predictions
🎓 Admission systems
🧑‍💼 Hiring platforms

Any domain where fair decision-making matters

🎯 Results
Improved fairness across demographic groups
Reduced bias in predictions
Better model transparency
🔮 Future Improvements
Real-time fairness monitoring
Dashboard UI for bias visualization
Integration with production ML pipelines
Support for deep learning models
🤝 Contributing

Contributions are welcome!
