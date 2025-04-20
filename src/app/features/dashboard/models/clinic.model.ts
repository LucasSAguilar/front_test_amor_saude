export interface ClinicInterface {
	id: number;
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
    regional: string;
    data_inauguracao: Date | string;
    ativa: boolean;
    especialidades: string[];
}