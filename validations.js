import * as fuzz from 'fuzzball';

export const optional = ({ field, body }, ret) => {

    const value = body?.[field];

    const isEmpty =
        value === null || value === undefined || value === '';

    if (isEmpty) { return false; }

    return ret;
}

export const notEmpty = ({ field, body }) => {

    if (!body?.[field]) {
        return { [field]: `Campo '${field}' obligatorio, `+
            `pero valor '${body?.[field]}' no contiene información.` }
    }

    return false;
}

export const string = ({ field, body }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (typeof body[field] !== "string") {
        return { [field]: `Valor '${body[field]}' no es un string` }
    }

    return false;
}

export const bool = ({ field, body }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (typeof body[field] !== "boolean") {
        return { [field]: `Valor '${body[field]}' no es un boolean` }
    }

    return false;
}

//export const fuzzyCategorical =
export const categorical =
    ({ field, body, categories }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (typeof body[field] !== "string") return string({ field, body });

    if (categories.includes(body[field])) return false;

    const results = fuzz.extract(body[field], categories, { limit: 3 });

    const validSuggestions =
            results.filter(r => r[1] > 60).map(r => `'${r[0]}'`);

    let errorMsg = `'${body[field]}' no existe.`;

    if (validSuggestions.length > 0) {
        errorMsg +=
            ` Opciones similares: [${validSuggestions.join(', ')}]`;

    } else if (categories.length <= 10) {
        const allOptions = categories.map(cat => `'${cat}'`).join(', ');
        errorMsg += ` Las opciones disponibles son: [${allOptions}]`;
    } else {
        errorMsg += " Sin coincidencias significativas.";
    }

    return { [field]: errorMsg };
};

export const email =
    ({ field, body, maxLength = 254 }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (typeof body[field] !== "string") return string({ field, body });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(body[field])) {
        return { [field]: `El valor '${body[field]}' `+
            `no es un email válido` };
    }

    if (body[field].length > maxLength) {
        return { [field]: `El email no puede superar los `+
            `${maxLength} caracteres` };
    }

    return false;
};

/*
export const categorical =
    ({ field, body[field], categories }) => {

    if (!body[field]) return notEmpty({ field, body[field] });

    if (typeof body[field] !== "string") return string({ field, body[field] });

    if (categories.includes(body[field])) return false;

    return { [field]: `Valor '${body[field]}' no está en `+
        `[${categories.map(cat => "'"+cat+"'")}]` };
}
*/

export const date =
    ({ field, body }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (typeof body[field] !== "string") return string({ field, body });

    if (!/^\d{4}-\d{2}-\d{2}$/.test(body[field])) {
        return {
            [field]: `Fecha '${body[field]}' no está en `+
                `formato 'YYYY-MM-DD`
        }
    }

    const [year, month, day] = body[field].split("-").map(Number);
    const inputDate = new Date(year, month - 1, day);

    const check =
        inputDate.getFullYear() !== year ||
        inputDate.getMonth() !== month - 1 ||
        inputDate.getDate() !== day

    if (check) {
        return {
            [field]: `Fecha '${body[field]}' es inválida`
        }
    }

    const now = new Date();

    if (inputDate > now) {
        return {
            [field]: `Fecha '${body[field]}' está en el futuro`
        }
    }

    return false;
}

export const exists =
    async ({ field, body, MODELS, model }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (typeof body[field] !== "string") return string({ field, body });

    const res = await MODELS[model].findOne({
        where: { id: body[field] } });

    if (!res) {
        return { [field]: `No existe '${model}' con id `+
            `"${field}"='${body[field]}'` };
    }

    return false;
}

export const unique =
    async ({ field, body, MODELS, model }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (typeof body[field] !== "string") return string({ field, body });

    const res = await MODELS[model].findOne({
        where: { [field]: body[field] } });

    if (res) {
        return { [field]: `Ya existe instancia de '${model}' con `+
            `"${field}"='${body[field]}'` };
    }

    return false;
}

export const rut =
    async ({ field, body, MODELS, model }) => {

    const uniq = await unique({ field, body, MODELS, model });
    if (uniq) return uniq;

    const rut =
        body[field].replace(/\./g, "").replace(/-/g, "")
            .toUpperCase().trim();

    // Debe tener al menos 2 caracteres (cuerpo + dv)
    if (!/^[0-9]+[0-9K]$/.test(rut))
        return { [field]: `Valor '${body[field]}' no es un rut válido `+
            `en formato 'XXXXXX-X` };

    const rutbody = rut.slice(0, -1);
    const dv = rut.slice(-1);

    let sum = 0;
    let multiplier = 2;

    // Recorrer de derecha a izquierda
    for (let i = rutbody.length - 1; i >= 0; i--) {
        sum += parseInt(rutbody[i], 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = 11 - (sum % 11);
    let calculatedDv;

    if (remainder === 11) calculatedDv = "0";
    else if (remainder === 10) calculatedDv = "K";
    else calculatedDv = remainder.toString();

    const check = dv === calculatedDv;
    if (!check) {
        return { [field]: `Valor '${body[field]}' no es `+
            `un rut válido. Dígito verificador debería ser `+
            `'${calculatedDv}', pero es '${dv}'` }
    };

    return false;
}

export const validate = async (body, validationDic) => {

    const errors = [];

    for (let field in body) {
        const fields = Object.keys(validationDic).map(
            cat => "'"+cat+"'");

        if (!(field in validationDic)) {
            errors.push(
                { [field]: `Campo '${field}' inválido. `+
                    `Campos válidos: [${cats.join(', ')}]` });
        }
    }

    for (let field in validationDic) {
        const error = await validationDic[field](field, body);
        if (error) errors.push(error);
    }

    if (errors.length) return errors;
    return null;
}


