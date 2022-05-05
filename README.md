# Configuración
## API
Crear en la raíz de `api` el archivo `.env` con el siguiente formato.

PORT = *1111* **(Número de puerto donde levantará la api)** <br />
NODE_ENV = *'production' | 'development'* **(Variable que indica en qué estado debe levantarse la api)** <br />
FILE_STORAGE_PATH = *'public/uploads'* **(Indica el path en donde se subiran los archivos)** <br />
DB_URL = *'postgres://localhost/db'* **(Indica la url de la base de datos)** <br />
<br />
DB_HOST = *'127.0.0.1'* **(IP de la base)** <br />
DB_PORT = *'5432'* **(Puerto de la base)** <br />
DB_USER = *'user'* **(Usuario de la base)** <br />
DB_PASSWORD = *'pass'* **(Contraseña de la base)** <br />
DB_DATABASE = *'db'* **(Nombre de la base)** <br />
<br />
EMAIL_USER = *'email'* **(Email)** <br />
EMAIL_PASSWORD = *'pass'* **(Contraseña del email)** <br />
