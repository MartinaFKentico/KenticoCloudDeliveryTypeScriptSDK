import { IPagination } from '../../interfaces/common/ipagination.interface';
export declare class Pagination implements IPagination {
    skip: number;
    limit: number;
    count: number;
    next_page: string;
    constructor(skip: number, limit: number, count: number, next_page: string);
}