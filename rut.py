import secrets

def calcular_dv(rut_sin_dv: str) -> str:
    rut = rut_sin_dv.replace(".", "").replace("-", "")
    suma = 0
    multiplicador = 2

    for digito in reversed(rut):
        suma += int(digito) * multiplicador
        multiplicador += 1
        if multiplicador > 7:
            multiplicador = 2

    resto = suma % 11
    dv = 11 - resto

    if dv == 11:
        return "0"
    elif dv == 10:
        return "K"
    else:
        return str(dv)

def rut_sin_dv():
    return secrets.randbelow(70_000_000 - 1_000_000 + 1) + 1_000_000
