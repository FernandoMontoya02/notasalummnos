import { Persona } from './Persona';

export class Estudiante extends Persona {
    codigo: number;
    parcial1: number;
    parcial2: number;
    examenRecuperacion?: number; // Opcional si no aplica
    notaFinal?: number; // Para nota definitiva
    estadoAprobatorio?: string;

    constructor(
        cod: number,
        ced: string,
        nom: string,
        ape: string,
        sexo: string,
        fn: string,
        p1: number,
        p2: number
    ) {
        super(ced, nom, ape, sexo, fn);
        this.codigo = cod;
        this.parcial1 = p1;
        this.parcial2 = p2;
        this.determinarEstado(); 
    }

    // Método para clonar el objeto Estudiante
    clone(): Estudiante {
        return new Estudiante(
            this.codigo,
            this.cedula,
            this.nombres,
            this.apellidos,
            this.sexo,
            this.fechaNacimiento,
            this.parcial1,
            this.parcial2
        );
    }

    calcularCalificacionFinal(): number {
        return (this.parcial1 + this.parcial2) / 2;
    }

    determinarEstado(): void {
        const cf = this.calcularCalificacionFinal();
        if (cf >= 7) {
            this.estadoAprobatorio = "Aprobado";
            this.notaFinal = cf;
        } else if (cf < 5.5) {
            this.estadoAprobatorio = "Reprobado";
            this.notaFinal = cf;
        } else {
            if (this.examenRecuperacion !== undefined) {
                this.notaFinal = cf * 0.4 + this.examenRecuperacion * 0.6;
                this.estadoAprobatorio = this.notaFinal >= 7 ? "Aprobado" : "Reprobado";
            } else {
                this.estadoAprobatorio = "Pendiente de recuperación";
                this.notaFinal = cf; 
            }
        }
    }
}