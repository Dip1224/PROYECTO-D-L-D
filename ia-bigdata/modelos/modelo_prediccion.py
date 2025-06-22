from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pandas as pd

class ModeloPrediccion:
    def __init__(self, data):
        self.data = data
        self.model = RandomForestClassifier()

    def preparar_datos(self):
        # Separar características y etiquetas
        X = self.data.drop('rendimiento', axis=1)
        y = self.data['rendimiento']
        return train_test_split(X, y, test_size=0.2, random_state=42)

    def entrenar_modelo(self):
        X_train, X_test, y_train, y_test = self.preparar_datos()
        self.model.fit(X_train, y_train)
        y_pred = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        return accuracy

    def predecir(self, nuevos_datos):
        return self.model.predict(nuevos_datos)