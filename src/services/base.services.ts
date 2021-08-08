import { Pagination } from "../interfaces/common.interface";

class BaseService {
  constructor(
  ) {
    
  }


  _offset(page:number = 1, limit:number = 10,) {
    const offset = (page - 1) * limit;
    return offset;
  }
  _pagination(page:number = 1, limit:number = 10, total:number=0): Pagination {
    return {
      limit,
      page,
      total: Math.floor(total/page)
    }
  }
}

export default BaseService;