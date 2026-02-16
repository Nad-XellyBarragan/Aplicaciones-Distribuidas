const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

/**
 * Función auxiliar para validar parámetros
 */
const validateStrings = (req, res, keys) => {
    for (const key of keys) {
        if (req.body[key] === undefined || typeof req.body[key] !== 'string') {
            res.status(400).json({
                status: "error",
                error: `El parámetro '${key}' es requerido y debe ser una cadena.`
            });
            return false;
        }
    }
    return true;
};

// i. mascaracteres
app.post('/mascaracteres', (req, res) => {
    if (!validateStrings(req, res, ['str1', 'str2'])) return;
    const { str1, str2 } = req.body;
    const result = str2.length > str1.length ? str2 : str1;
    res.json({ status: "success", result });
});

// ii. menoscaracteres
app.post('/menoscaracteres', (req, res) => {
    if (!validateStrings(req, res, ['str1', 'str2'])) return;
    const { str1, str2 } = req.body;
    const result = str2.length < str1.length ? str2 : str1;
    res.json({ status: "success", result });
});

// iii. numcaracteres
app.post('/numcaracteres', (req, res) => {
    if (!validateStrings(req, res, ['str'])) return;
    const { str } = req.body;
    res.json({ status: "success", result: str.length });
});

// iv. palindroma
app.post('/palindroma', (req, res) => {
    if (!validateStrings(req, res, ['str'])) return;
    const { str } = req.body;
    const cleanStr = str.toLowerCase().replace(/[\W_]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');
    res.json({ status: "success", result: cleanStr === reversedStr });
});

// v. concat
app.post('/concat', (req, res) => {
    if (!validateStrings(req, res, ['str1', 'str2'])) return;
    const { str1, str2 } = req.body;
    res.json({ status: "success", result: str1 + str2 });
});

// vi. applysha256
app.post('/applysha256', (req, res) => {
    if (!validateStrings(req, res, ['str'])) return;
    const { str } = req.body;
    const hash = crypto.createHash('sha256').update(str).digest('hex');
    res.json({ status: "success", original: str, hash: hash });
});

// vii. verifysha256
app.post('/verifysha256', (req, res) => {
    if (!validateStrings(req, res, ['str', 'hash'])) return;
    const { str, hash } = req.body;
    const generatedHash = crypto.createHash('sha256').update(str).digest('hex');
    res.json({ status: "success", result: generatedHash === hash });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});