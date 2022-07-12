import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

interface WeatherResponse {
    name: string;
    main: { temp: number };
    sys: { sunrise: number, sunset: number };
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private http: HttpClient) {
    }

    isLoading = true;
    URL_API = 'https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&appid=acc2caec8e1294a40424dde232848027';
    cityName: string;
    temp: number;
    sunrisePipe: number;
    sunsetPipe: number;
    weatherSubscription$: Subscription;

    ngOnInit(): void {
        this.weatherSubscription$ = this.http
            .get<WeatherResponse>(this.URL_API)
            .subscribe(data => {
                    this.cityName = data.name;
                    this.temp = data.main.temp;

                    const sunriseUnix = data.sys.sunrise;
                    const sunsetUnix = data.sys.sunset;
                    this.sunrisePipe = sunriseUnix * 1000;
                    this.sunsetPipe = sunsetUnix * 1000;
                    this.isLoading = false;
                },
                error => {
                    this.isLoading = false;
                });
    }
}
