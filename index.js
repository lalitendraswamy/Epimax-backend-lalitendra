
const express = require('express');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const dontenv = require('dotenv')
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');



dontenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use( authRoutes);

// Protected assignments routes
app.use(taskRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))    

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
