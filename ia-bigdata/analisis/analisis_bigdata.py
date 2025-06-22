import pandas as pd
from pyspark.sql import SparkSession

# Inicializar Spark
spark = SparkSession.builder \
    .appName("Analisis Big Data") \
    .getOrCreate()

def cargar_datos(ruta_archivo):
    """
    Carga datos desde un archivo CSV a un DataFrame de Spark.
    """
    df = spark.read.csv(ruta_archivo, header=True, inferSchema=True)
    return df

def analizar_distribucion(df, columna):
    """
    Analiza la distribución de una columna específica en el DataFrame.
    Devuelve un DataFrame con la distribución.
    """
    distribucion = df.groupBy(columna).count()
    return distribucion

def guardar_resultados(df, ruta_salida):
    """
    Guarda el DataFrame de resultados en un archivo CSV.
    """
    df.write.csv(ruta_salida, header=True)

if __name__ == "__main__":
    # Ejemplo de uso
    ruta_archivo = "ruta/a/tu/archivo.csv"  # Cambiar por la ruta real del archivo
    ruta_salida = "ruta/a/tu/salida.csv"  # Cambiar por la ruta de salida deseada

    # Cargar datos
    df = cargar_datos(ruta_archivo)

    # Analizar distribución por sexo
    distribucion_sexo = analizar_distribucion(df, "sexo")
    guardar_resultados(distribucion_sexo, ruta_salida)