from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np

class IAService:
    def __init__(self, data):
        self.data = data
        self.model = LinearRegression()

    def preprocess_data(self):
        # Aquí se pueden realizar transformaciones necesarias en los datos
        self.data.fillna(0, inplace=True)

    def train_model(self):
        X = self.data.drop('rendimiento', axis=1)  # Suponiendo que 'rendimiento' es la variable objetivo
        y = self.data['rendimiento']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        return self.model.score(X_test, y_test)

    def predict(self, new_data):
        return self.model.predict(new_data)