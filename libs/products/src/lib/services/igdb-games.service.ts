import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IGDBGamesService {
  private apiUrl = '/api/v4/games';

  constructor(private http: HttpClient) { }

  getGames(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}`, 'fields *;where platforms = 9;limit 500;', {
      headers: {
        'Accept': 'application/json',
        'Client-ID': '4mmynh9wdgtfip44dm0xh2wrvgs10y',
        'Authorization': 'Bearer n1c6o3s5taz8oz83akid6aji43epu3',
      }
    })
  }
  searchGames(searchTerm: string) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Client-ID', '4mmynh9wdgtfip44dm0xh2wrvgs10y')
      .set('Authorization', 'Bearer 85ojkshxl45adsjgln11wbwswxyirw');
    const body = `search "${searchTerm}"; fields *; where platforms = 9;limit 500;`;
    return this.http.post<any[]>('/api/v4/games', body, { headers });
  }


  // https://images.igdb.com/igdb/image/upload/t_cover_big/co6jar.png
  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`http://localhost:3000/categories/${id}`)
  }
  createGame(Game: Game): Observable<Game> {
    return this.http.post<Game>(`http://localhost:3000/categories/`, Game)
  }
  updateGame(id: number, Game: Game): Observable<Game> {
    return this.http.put<Game>(`http://localhost:3000/categories/${id}`, Game)
  }
  deleteGame(id: string): Observable<Game> {
    return this.http.delete<Game>(`http://localhost:3000/categories/${id}`)
  }
}
