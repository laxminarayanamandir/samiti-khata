import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReceiptBookDto } from './lib/receipt-book.dto';
import { ReceiptBookService } from './receipt-book.service';
import { UpdateBookStatusDto } from './lib/updateBookStatus.dto';
import { ReceiptBookQueryDto } from './lib/receipt-book.query.dto';
import buildReceiptWhereClause from './lib/buildReceiptWhereClause';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { CursorPaginationDto } from '../../../common/cursorPagination.dto';
import { RequireAdminOrOperator } from '@shared/auth/decorators/adminOrOperator.decorator';

@Controller('receipt-book')
@RequireAdminOrOperator()
export class ReceiptBookController {
  constructor(private readonly receiptBookService: ReceiptBookService) {}

  @Post()
  async create(
    @Body() receiptBookDto: ReceiptBookDto,
    @GetUser('organizationId') organizationId: number,
  ) {
    return await this.receiptBookService.create(receiptBookDto, organizationId);
  }

  @Get()
  async getAll(
    @GetUser('organizationId') organizationId: number,
    @Query() queryParams: ReceiptBookQueryDto,
  ) {
    const whereClause = buildReceiptWhereClause(organizationId, queryParams);

    return await this.receiptBookService.getAll(whereClause, queryParams);
  }

  @Get('/cursor')
  async getAllViaCursorPaginated(
    @GetUser('organizationId') organizationId: number,
    @Query() queryParams: CursorPaginationDto,
  ) {
    return await this.receiptBookService.getAllViaCursorPaginated(
      organizationId,
      queryParams,
    );
  }

  @Patch('status/:bookId')
  async updateBookStatus(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() updateBookStatusDto: UpdateBookStatusDto,
  ) {
    return await this.receiptBookService.updateBookStatus(
      bookId,
      updateBookStatusDto,
    );
  }

  @Get(':bookId')
  async getById(
    @Param('bookId', ParseIntPipe) bookId: number,
    @GetUser('organizationId') organizationId: number,
  ) {
    return await this.receiptBookService.getById(bookId, organizationId);
  }
}
