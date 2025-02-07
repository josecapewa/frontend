import BaseService from "../base";

export const benefitService = new BaseService<Benefit, BenefitToCreate>('/benefits');