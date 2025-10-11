import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { PreparationDto } from "src/common/dto/preparation.dto";

@Injectable()
export class PreparationProxy {
    
    private backendUrl: string;

    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService,
    ) {
        this.backendUrl = this.config.get<string>('GATEWAY_URL_WITH_PORT') ?? '';
        this.backendUrl += '/kitchen';
    }


    public async getPreparations(
        state: 'readyToBeServed' | 'preparationStarted',
        tableNumber?: number
    ): Promise<PreparationDto[]> {
        const params: any = { state };
        if (tableNumber !== undefined) {
            params.tableNumber = tableNumber;
        }
        const { data } = await firstValueFrom(this.http.get<PreparationDto[]>(`${this.backendUrl}/preparations`, { params }));
        return data;
    }
}
