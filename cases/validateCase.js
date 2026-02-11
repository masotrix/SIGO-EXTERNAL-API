const checkHistoricStage = oldRegister => {

    for (const historic of oldRegister.historics) {
        for (const historicStage of historic.historicStages) {

            return true;
        }
    }

    return false;

}

export default async (oldRegister, newModels) => {
    if (!checkHistoricStage(oldRegister)) {
        return `Registro oncologico ` +
            `sin etapas oncologicas asociadas`;
    }

    if (oldRegister.closureTypeId===4) {
        return `Registro oncologico ` +
            `ingresado por error (closureTypeId=4)`;
    }
}
