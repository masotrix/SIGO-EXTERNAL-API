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

export const integer = ({ field, body }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (Number.isInteger(body[field])) {
        return { [field]: `Valor '${body[field]}' no es un entero` }
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
    ({ field, body, categories, match=60 }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (typeof body[field] !== "string") return string({ field, body });

    if (categories.includes(body[field])) return false;

    const results = fuzz.extract(body[field], categories, { limit: 3 });

    const validSuggestions =
            results.filter(r => r[1] > match).map(r => `'${r[0]}'`);

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

export const lessDate = ({ field1, field2, body }) => {

    const errDate1 = date({ field: field1, body, MODELS, model });
    if (errDate1) return errDate1;

    const errDate2 = date({ field: field2, body, MODELS, model });
    if (errDate2) return errDate2;

    const [year1, month1, day1] = body[field1].split("-").map(Number);
    const date1 = new Date(year1, month1 - 1, day1);

    const [year2, month2, day2] = body[field2].split("-").map(Number);
    const date2 = new Date(year2, month2 - 1, day2);

    if (date2 < date1) {
        return {
            [field2]: `Fecha "${field2}"='${body[field2]}' `+
                `es menor que fecha "${field1}"='${body[field1]}'`
        }
    }

    return false;
}

export const daysBetween = ({ field1, field2, field3, body }) => {

    const errDate1 = date({ field: field1, body, MODELS, model });
    if (errDate1) return errDate1;

    const errDays = integer({
        field: field2, body, MODELS, model });
    if (errDays) return errDays;

    const errDate2 = date({ field: field3, body, MODELS, model });
    if (errDate2) return errDate2;

    const [year1, month1, day1] = body[field1].split("-").map(Number);
    const date1 = new Date(year1, month1 - 1, day1);

    const [year2, month2, day2] = body[field3].split("-").map(Number);
    const date2 = new Date(year2, month2 - 1, day2);

    const diferenciaMs = date2 - date1;
    const dias = diferenciaMs / (1000 * 60 * 60 * 24);

    const diasEsperados = body[field2];

    if (dias !== diasEsperados) {
        return {
            [field2]: `Días entre fechas `+
                `"${field1}"='${body[field1]}' `+
                `y "${field3}"='${body[field3]}' `+
                `hay '${diasEsperados}' días pero `+
                `"${field2}"='${body[field2]}'`
        }
    }

    return false;
}

export const requiredIf = ({ field1, value1, field2, body }) => {

    const field1empty = notEmpty({ field: field1, body });
    if (field1empty) return false;

    const field2empty = notEmpty({ field: field2, body });
    if (field2empty) {
        return { [field2]: `Campo "${field1}"='${body[field1]}' `+
            `no vacío, pero campo "${field2}"='${body[field2]}' `+
            `sin información` };
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
        return { [field]: `No existe instancia de '${model}' con `+
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
    async ({ field, body, MODELS, model, checkExistence = true }) => {

    if (!body?.[field]) return notEmpty({ field, body });

    if (typeof body[field] !== "string") return string({ field, body });


    if (checkExistence) {
        const uniq = await unique({ field, body, MODELS, model });
        if (uniq) return uniq;
    }

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

export const validate =
    async ({ body, validationDic, MODELS, model,
        extraRules=[], defaultDic={} }) => {

    const errors = [];

    for (let field in body) {
        const fields = Object.keys(validationDic).map(
            cat => "'"+cat+"'");

        if (!(field in validationDic)) {
            errors.push(
                { [field]: `Campo '${field}' inválido. `+
                    `Campos válidos: [${fields.join(', ')}]` });
        }
    }

    for (let field in validationDic) {
        const error = await validationDic[field](field, body);
        if (error) errors.push(error);
    }

    for (let val in extraRules) {
        const error = await val(body);
        if (error) errors.push(error);
    }

    if (errors.length) return errors;

    for (let field in defaultDic) {
        if (field in body && body[field]) continue;
        if (!defaultDic[field]) continue;
        body[field] = defaultDic[field];
    }

    for (let field in body) {
        if (body[field]) continue;

        const modelField = MODELS[model].rawAttributes[field];

        if (modelField && 'defaultValue' in modelField) {

            body[field] = undefined;

        } else {

            body[field] = null;

        }
    }

    return null;
}





















