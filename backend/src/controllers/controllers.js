import { pool } from "../../db.js";

// --- 1. LISTA BLANCA PARA DOCENTES (IID) ---
const ALLOWED_COLUMNS_IID = [
    "nombre", "correo", "vinculacion", // Datos básicos
    "PNC_A1_2024", "PNC_A1_2025", "PNC_A2_2024", "PNC_A2_2025", "PNC_B_2024", "PNC_B_2025", "PNC_C_2024", "PNC_C_2025", "PNC_NI_2024", "PNC_NI_2025", "PNC_LI_2024", "PNC_LI_2025", "PNC_CI_2024", "PNC_CI_2025",
    "PDTI_PIC_2024", "PDTI_PIC_2025", "PDTI_PIT_2024", "PDTI_PIT_2025", "PDTI_PUC_2024", "PDTI_PUC_2025", "PDTI_PMUT_2024", "PDTI_PMUT_2025", "PDTI_PCCV_2024", "PDTI_PCV_2025", "PDTI_PSCV_2024", "PDTI_PSCV_2025", "PDTI_SCR_2024", "PDTI_SCR_2025", "PDTI_SSR_2024", "PDTI_SSR_2025",
    "FRHIFI_PGIDMAS1_2024", "FRHIFI_PGIDMAS1_2025", "FRHIFI_PGIDMENOS1_2024", "FRHIFI_PGIDMENOS1_2025", "FRHIFI_PGIIMAS1_2024", "FRHIFI_PGIIMAS1_2025", "FRHIFI_PGIIMENOS1_2024", "FRHIFI_PGIIMENOS1_2025", "FRHIFI_PSIMMAS1_2024", "FRHIFI_PSIMMAS1_2025", "FRHIFI_PSIMMENOS1_2024", "FRHIFI_PSIMMENOS1_2025", "FRHIFI_PCI_2024", "FRHIFI_PCI_2025", "FRHIFI_PCN_2024", "FRHIFI_PCN_2025", "FRHIFI_PCAPIN_2024", "FRHIFI_PCAPIN_2025", "FRHIFI_PCOMPINT_2024", "FRHIFI_PCOMPINT_2025", "FRHIFI_PCOMN_2024", "FRHIFI_PCOMN_2025", "FRHIFI_PCOMINS_2024", "FRHIFI_PCOMINS_2025", "FRHIFI_PEC_2024", "FRHIFI_PEC_2025", "FRHIFI_DMCFI_2024", "FRHIFI_DMCFI_2025",
    "FRHIIF_PIPCPII_2024", "FRHIIF_PIPCPII_2025", "FRHIIF_PIPII_2024", "FRHIIF_PIPII_2025", "FRHIIF_PIPCPIN_2024", "FRHIIF_PIPCPIN_2025", "FRHIIF_PIPIN_2024", "FRHIIF_PIPIN_2025", "FRHIIF_PIPUDFJC_2024", "FRHIIF_PIPUDFJC_2025", "FRHIIF_PIPCUDFJC_2024", "FRHIIF_PIPCUDFJC_2025", "FRHIIF_PIPUDFJCES_2024", "FRHIIF_PIPUDFJCES_2025", "FRHIIF_PIPCUDFJCES_2024", "FRHIIF_PIPCUDFJCES_2025", "FRHIIF_PPIUDFJNOIN_2024", "FRHIIF_PPIUDFJNOIN_2025", "FRHIIF_DTGDD_2024", "FRHIIF_DTGDD_2025", "FRHIIF_DTGDSIND_2024", "FRHIIF_DTGDSIND_2025", "FRHIIF_DTGMDML_2024", "FRHIIF_DTGMDML_2025", "FRHIIF_DTGMSIND_2024", "FRHIIF_DTGMSIND_2025", "FRHIIF_DTGPDML_2024", "FRHIIF_DTGPDML_2025", "FRHIIF_DTGPSIND_2024", "FRHIIF_DTGPSIND_2025", "FRHIIF_PRI_2024", "FRHIIF_PRI_2025", "FRHIIF_PRN_2024", "FRHIIF_PRN_2025", "FRHIIF_PRINS_2024", "FRHIIF_PRINS_2025",
    "DCC_PEAI_2024", "DCC_PEAI_2025", "DCC_PEAN_2024", "DCC_PEAN_2025", "DCC_PEAINS_2024", "DCC_PEAINS_2025", "DCC_OEAI_2024", "DCC_OEAI_2025", "DCC_OEAN_2024", "DCC_OEAN_2025", "DCC_OEAINS_2024", "DCC_OEAINS_2025"
];

// --- 2. LISTA BLANCA PARA ESTUDIANTES (IIE) ---
const ALLOWED_COLUMNS_IIE = [
    "nombre", "correo", "ciclo", // Datos básicos IIE
    "PNC_A1_2024", "PNC_A1_2025", "PNC_A2_2024", "PNC_A2_2025", "PNC_B_2024", "PNC_B_2025", "PNC_C_2024", "PNC_C_2025", "PNC_NI_2024", "PNC_NI_2025", "PNC_LI_2024", "PNC_LI_2025", "PNC_CI_2024", "PNC_CI_2025",
    "PDTI_PIC_2024", "PDTI_PIC_2025", "PDTI_PIT_2024", "PDTI_PIT_2025", "PDTI_PUC_2024", "PDTI_PUC_2025", "PDTI_PMUT_2024", "PDTI_PMUT_2025", "PDTI_PCCV_2024", "PDTI_PCV_2025", "PDTI_PSCV_2024", "PDTI_PSCV_2025", "PDTI_SCR_2024", "PDTI_SCR_2025", "PDTI_SSR_2024", "PDTI_SSR_2025",
    "FRHIFI_PGIIMAS1_2024", "FRHIFI_PGIIMAS1_2025", "FRHIFI_PGIIMENOS1_2024", "FRHIFI_PGIIMENOS1_2025", "FRHIFI_PSIMMAS1_2024", "FRHIFI_PSIMMAS1_2025", "FRHIFI_PSIMMENOS1_2024", "FRHIFI_PSIMMENOS1_2025", "FRHIFI_PSIIMAS1_2024", "FRHIFI_PSIIMAS1_2025", "FRHIFI_PSIIMENOS1_2024", "FRHIFI_PSIIMENOS1_2025", "FRHIFI_PCI_2024", "FRHIFI_PCI_2025", "FRHIFI_PCN_2024", "FRHIFI_PCN_2025", "FRHIFI_PCAPIN_2024", "FRHIFI_PCAPIN_2025", "FRHIFI_PCOMPINT_2024", "FRHIFI_PCOMPINT_2025", "FRHIFI_PCOMN_2024", "FRHIFI_PCOMN_2025", "FRHIFI_PCOMINS_2024", "FRHIFI_PCOMINS_2025", "FRHIFI_PEC_2024", "FRHIFI_PEC_2025", "FRHIFI_DMCFI_2024", "FRHIFI_DMCFI_2025",
    "FRHIIF_PIPCPII_2024", "FRHIIF_PIPCPII_2025", "FRHIIF_PIPII_2024", "FRHIIF_PIPII_2025", "FRHIIF_PIPCPIN_2024", "FRHIIF_PIPCPIN_2025", "FRHIIF_PIPIN_2024", "FRHIIF_PIPIN_2025", "FRHIIF_PIPUDFJC_2024", "FRHIIF_PIPUDFJC_2025", "FRHIIF_PIPCUDFJC_2024", "FRHIIF_PIPCUDFJC_2025", "FRHIIF_PIPUDFJCES_2024", "FRHIIF_PIPUDFJCES_2025", "FRHIIF_PIPCUDFJCES_2024", "FRHIIF_PIPCUDFJCES_2025", "FRHIIF_PPIUDFJNOIN_2024", "FRHIIF_PPIUDFJNOIN_2025", "FRHIIF_BBJIPS_2024", "FRHIIF_BBJIPS_2025", "FRHIIF_PAIPIUDFJCI_2024", "FRHIIF_PAIPIUDFJCI_2025", "FRHIIF_TGMIICI_2024", "FRHIIF_TGMIICI_2025", "FRHIIF_TGMPA_2024", "FRHIIF_TGMPA_2025", "FRHIIF_TGMP_2024", "FRHIIF_TGMP_2025", "FRHIIF_PRI_2024", "FRHIIF_PRI_2025", "FRHIIF_PRN_2024", "FRHIIF_PRN_2025", "FRHIIF_PRINS_2024", "FRHIIF_PRINS_2025",
    "DCC_PEAI_2024", "DCC_PEAI_2025", "DCC_PEAN_2024", "DCC_PEAN_2025", "DCC_PEAINS_2024", "DCC_PEAINS_2025", "DCC_OEAI_2024", "DCC_OEAI_2025", "DCC_OEAN_2024", "DCC_OEAN_2025", "DCC_OEAINS_2024", "DCC_OEAINS_2025"
];



// --- 2. FUNCIÓN DE INSERCIÓN GENÉRICA ---
const processInsert = async (tableName, allowedList, data) => {
    // Filtramos solo los campos que están permitidos
    const filteredEntries = Object.entries(data).filter(([key]) => 
        allowedList.includes(key)
    );

    if (filteredEntries.length === 0) throw new Error("No hay datos válidos para insertar");

    // Construimos la query sin usar comillas dobles en los nombres para evitar errores de relación
    const columns = filteredEntries.map(([key]) => key).join(", ");
    const placeholders = filteredEntries.map((_, i) => `$${i + 1}`).join(", ");
    
    const values = filteredEntries.map(([key, value]) => {
        // Si el valor está vacío, decidimos si enviar null (texto) o 0 (números)
        if (value === "" || value === null || value === undefined) {
            const isTextField = ["nombre", "correo", "vinculacion", "ciclo"].includes(key.toLowerCase());
            return isTextField ? null : 0;
        }
        return value;
    });

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    
    console.log(`Ejecutando en ${tableName}...`);
    return pool.query(query, values);
};

// --- 3. EXPORTS ---

export const createUser = async (req, res) => {
    // Buscamos el correo sin importar si viene como 'correo' o 'CORREO'
    const email = req.body.correo || req.body.CORREO || req.body.Correo;

    try {
        if (!email) {
            return res.status(400).json({ message: "El campo correo es obligatorio" });
        }

        // Usamos "correo" (minúsculas) que es como Postgres suele guardar las columnas
        // Si tu columna se llama exactamente CORREO, cambia el WHERE a "CORREO" = $1
        const checkUser = await pool.query('SELECT id FROM IID WHERE correo = $1', [email]);

        if (checkUser.rows.length > 0) {
            return res.status(400).json({ message: "Este correo ya está registrado en IID" });
        }

        await processInsert("IID", ALLOWED_COLUMNS_IID, req.body);
        res.status(201).json({ message: "Guardado exitosamente en IID" });

    } catch (error) {
        console.error("ERROR IID:", error.message);
        res.status(500).json({ message: "Error: " + error.message });
    }
};

export const createUserIIE = async (req, res) => {
    const email = req.body.correo || req.body.CORREO || req.body.Correo;

    try {
        if (!email) {
            return res.status(400).json({ message: "El campo correo es obligatorio" });
        }

        const checkUser = await pool.query('SELECT id FROM IIE WHERE correo = $1', [email]);

        if (checkUser.rows.length > 0) {
            return res.status(400).json({ message: "Este correo ya está registrado en IIE" });
        }

        await processInsert("IIE", ALLOWED_COLUMNS_IIE, req.body);
        res.status(201).json({ message: "Guardado exitosamente en IIE" });

    } catch (error) {
        console.error("ERROR IIE:", error.message);
        res.status(500).json({ message: "Error: " + error.message });
    }
};
