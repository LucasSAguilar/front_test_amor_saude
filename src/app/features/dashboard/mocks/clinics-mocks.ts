import { ClinicInterface } from "../models/clinic.model";

export const clinicsMock: ClinicInterface[] = [
    {
        id: 1,
        razao_social: 'Clinica A',
        nome_fantasia: 'Clinica A',
        cnpj: '12345678000195',
        regional: 'São Paulo',
        data_inauguracao: new Date('2022-01-01'),
        ativa: true,
        especialidades_medicas: ['Cardiologia', 'Pediatria'],
    },
    {
        id: 2,
        razao_social: 'Clinica B',
        nome_fantasia: 'Clinica B',
        cnpj: '98765432000100',
        regional: 'Rio de Janeiro',
        data_inauguracao: new Date('2021-05-15'),
        ativa: false,
        especialidades_medicas: ['Dermatologia', 'Oftalmologia'],
    },
    {
        id: 3,
        razao_social: 'Clinica C',
        nome_fantasia: 'Clinica C',
        cnpj: '55555555000155',
        regional: 'Belo Horizonte',
        data_inauguracao: new Date('2020-03-10'),
        ativa: true,
        especialidades_medicas: ['Ginecologia', 'Ortopedia'],
    },
    {
        id: 4,
        razao_social: 'Clinica D',
        nome_fantasia: 'Clinica D',
        cnpj: '44444444000144',
        regional: 'Porto Alegre',
        data_inauguracao: new Date('2019-07-20'),
        ativa: true,
        especialidades_medicas: ['Psiquiatria', 'Neurologia'],
    },
    {
        id: 5,
        razao_social: 'Clinica E',
        nome_fantasia: 'Clinica E',
        cnpj: '33333333000133',
        regional: 'Curitiba',
        data_inauguracao: new Date('2018-11-30'),
        ativa: false,
        especialidades_medicas: ['Endocrinologia', 'Gastroenterologia'],
    },
    {
        id: 6,
        razao_social: 'Clinica F',
        nome_fantasia: 'Clinica F',
        cnpj: '22222222000122',
        regional: 'Salvador',
        data_inauguracao: new Date('2017-02-25'),
        ativa: true,
        especialidades_medicas: ['Pneumologia', 'Reumatologia'],
    },
    {
        id: 7,
        razao_social: 'Clinica G',
        nome_fantasia: 'Clinica G',
        cnpj: '11111111000111',
        regional: 'Fortaleza',
        data_inauguracao: new Date('2016-08-05'),
        ativa: true,
        especialidades_medicas: ['Urologia', 'Otorinolaringologia'],
    },
    {
        id: 8,
        razao_social: 'Clinica H',
        nome_fantasia: 'Clinica H',
        cnpj: '66666666000166',
        regional: 'Manaus',
        data_inauguracao: new Date('2015-09-14'),
        ativa: false,
        especialidades_medicas: ['Hematologia', 'Infectologia'],
    },
    {
        id: 9,
        razao_social: 'Clinica I',
        nome_fantasia: 'Clinica I',
        cnpj: '77777777000177',
        regional: 'Recife',
        data_inauguracao: new Date('2014-04-22'),
        ativa: true,
        especialidades_medicas: ['Neurologia', 'Cardiologia'],
    },
    {
        id: 10,
        razao_social: 'Clinica J',
        nome_fantasia: 'Clinica J',
        cnpj: '88888888000188',
        regional: 'Belém',
        data_inauguracao: new Date('2013-12-11'),
        ativa: true,
        especialidades_medicas: ['Dermatologia', 'Pediatria'],
    },
    {
        id: 11,
        razao_social: 'Clinica K',
        nome_fantasia: 'Clinica K',
        cnpj: '99999999000199',
        regional: 'Goiânia',
        data_inauguracao: new Date('2012-06-30'),
        ativa: false,
        especialidades_medicas: ['Psiquiatria', 'Ginecologia'],
    },
    {
        id: 12,
        razao_social: 'Clinica L',
        nome_fantasia: 'Clinica L',
        cnpj: '10101010000101',
        regional: 'São Luís',
        data_inauguracao: new Date('2011-03-25'),
        ativa: true,
        especialidades_medicas: ['Ortopedia', 'Oftalmologia'],
    },
    {
        id: 13,
        razao_social: 'Clinica M',
        nome_fantasia: 'Clinica M',
        cnpj: '20202020000102',
        regional: 'Natal',
        data_inauguracao: new Date('2010-01-01'),
        ativa: true,
        especialidades_medicas: ['Endocrinologia', 'Urologia'],
    },
    {
        id: 14,
        razao_social: 'Clinica N',
        nome_fantasia: 'Clinica N',
        cnpj: '30303030000103',
        regional: 'Campo Grande',
        data_inauguracao: new Date('2009-05-19'),
        ativa: false,
        especialidades_medicas: ['Gastroenterologia', 'Reumatologia'],
    },
    {
        id: 15,
        razao_social: 'Clinica O',
        nome_fantasia: 'Clinica O',
        cnpj: '40404040000104',
        regional: 'João Pessoa',
        data_inauguracao: new Date('2008-08-08'),
        ativa: true,
        especialidades_medicas: ['Pneumologia', 'Cardiologia'],
    },
    {
        id: 16,
        razao_social: 'Clinica P',
        nome_fantasia: 'Clinica P',
        cnpj: '50505050000105',
        regional: 'Florianópolis',
        data_inauguracao: new Date('2007-10-10'),
        ativa: true,
        especialidades_medicas: ['Neurologia', 'Ginecologia'],
    },
    {
        id: 17,
        razao_social: 'Clinica Q',
        nome_fantasia: 'Clinica Q',
        cnpj: '60606060000106',
        regional: 'Teresina',
        data_inauguracao: new Date('2006-11-11'),
        ativa: false,
        especialidades_medicas: ['Psiquiatria', 'Ortopedia'],
    },
    {
        id: 18,
        razao_social: 'Clinica R',
        nome_fantasia: 'Clinica R',
        cnpj: '70707070000107',
        regional: 'Aracaju',
        data_inauguracao: new Date('2005-09-09'),
        ativa: true,
        especialidades_medicas: ['Pediatria', 'Dermatologia'],
    },
    {
        id: 19,
        razao_social: 'Clinica S',
        nome_fantasia: 'Clinica S',
        cnpj: '80808080000108',
        regional: 'Palmas',
        data_inauguracao: new Date('2004-04-04'),
        ativa: true,
        especialidades_medicas: ['Infectologia', 'Oftalmologia'],
    },
    {
        id: 20,
        razao_social: 'Clinica T',
        nome_fantasia: 'Clinica T',
        cnpj: '90909090000109',
        regional: 'Maceió',
        data_inauguracao: new Date('2003-02-02'),
        ativa: false,
        especialidades_medicas: ['Hematologia', 'Urologia'],
    }
];
