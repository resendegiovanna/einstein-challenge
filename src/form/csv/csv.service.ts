import { Injectable } from '@nestjs/common';
import { createObjectCsvStringifier } from 'csv-writer';

@Injectable()
export class CsvService {

  async generateCsv(data): Promise<string> {

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'user_email', title: 'USER_EMAIL' },
        { id: 'title', title: 'TITLE' },
        { id: 'answer', title: 'ANSWER' },
      ],
    });

    const header = csvStringifier.getHeaderString();
    const records = csvStringifier.stringifyRecords(data);

    return header + records;
  }
}
