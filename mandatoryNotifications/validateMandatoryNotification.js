export default async (oldDiagnosticConfirm, newModels) => {
    if (!(oldDiagnosticConfirm.confirmSolids.length)) {
        //return `Confirmación diagnóstica ${oldDiagnosticConfirm.id} sin confirmación "sólida"`;
        return `Confirmación diagnóstica sin confirmación "sólida"`;
    }

    for (const diagnosticConfirmSolid of oldDiagnosticConfirm.confirmSolids) {
        if (!(diagnosticConfirmSolid.topography?.code)) {
            /*
            return `Confirmación diagnóstica ${oldDiagnosticConfirm.id} sin topografía `+
            `${diagnosticConfirmSolid.topography} ` +
            `${JSON.stringify(diagnosticConfirmSolid.toJSON(), null, 2)}`;
            */
            return `Confirmación diagnóstica sin topografía`;
        }
    }

    //console.log(JSON.stringify(oldDiagnosticConfirm.confirmSolids[0].toJSON(), null, 2))
}
