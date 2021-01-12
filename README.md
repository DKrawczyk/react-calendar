# React Calendar

Tym razem będziemy wykorzystywać bibliotekę React do zbudowania prostej bazy danych przechowującej informacje o terminie spotkania z konkretną osobą (pobieramy przez formularz datę, godzinę, imię, nazwisko oraz email).

Szczególną uwagę należy zwrócić na kompozycje (czyli podział na mniejsze komponenty), odpowiednie umiejscowienie i wykorzystanie `state` w celu komunikacji poszczególnych komponentów ze sobą poprzez `props`.

Dane będziemy przechowywać na lokalnym API, wykorzystując gotowe rozwiązanie [json-server](https://github.com/typicode/json-server). Wspomniane rozwiązania zainstalujemy dzięki [npm](<https://pl.wikipedia.org/wiki/Npm_(manager_pakiet%C3%B3w)>) więc musimy mieć w systemie [Node.js](https://nodejs.org) w wersji co najmniej 10.16.

Jeśli mamy API to będziemy chcieli wykorzystywać `fetch` do pobierania i zapisywania danych.

## Jaki mamy problem do rozwiązania

Nasz znajomy [CEO](https://pl.wikipedia.org/wiki/Dyrektor_generalny) ma problem z organizacją swojego planu dnia ponieważ ciężko mu bez zbiorczej listy spotkań odpowiednio ustawić plan dnia na konkretny dzień.

Ty jako dobry kolega (i dobry programista) postanowiłeś mu pomóc - mając z tyłu głowy, że projekt może się rozwinąć.

## Niezbędne narzędzia

Na początek musimy przygotować nasze miejsce pracy. Projekt jest mały więc na poczatek wykorzystamy gotowe rozwiązania, aby nie tracić czasu na konfigurację. Na początku najważniejsze jest działające [MVP](http://www.biznesowerewolucje.com/mvp-minimum-viable-product-praktycznie/).

### Create React App

Wykorzystamy paczkę npm-ową w celu skonfigurowania sobie React-a. Jeśli mamy node.js w wersji równej lub wyższej niż 10.16 oraz npm >= 5.2 to wystarczy, że uruchomisz

```javascript
npx create-react-app@3 react-calendar
```

Zostanie wtedy utworzony katalog `react-calendar` i w nim będziesz miał już gotową strukturę swojej aplikacji. Spora część z tych elementów nie będzie przez Ciebie wykorzystywana, ale na chwilę obecną się tym nie przejmuj.

**Uwaga!** Instalacja wszystkich zależności możę troszkę trwać dlatego uzbroj się w cierpliwość. Nie muszę chyba wspominać, że dostęp do Internetu jest niezbędny, aby instalować pakiety :)

Jeśli nie jesteś pewny jaką wersją aplikacji posiadasz to możęsz to sprawdzić za pomocą flagi `-v`.

```javascript
node - v;
npm - v;
```

Po instalacji przechodzimy do katalogu z zainstalowanymi paczkami tj `cd react-calendar` i dodamy adres do naszego sklonowanego repozytorium za pomocą:

```
git remote add origin [adres-repozytorium]
```

Aby sprawdzić czy poprawnie dodaliśmy adres możemy skorzystać z komendy

```
git remote -v
```

Od tej pory możemy już `push`-ować nasze zmiany na GitHub-a.

Aby uruchomić lokalny serwer, który będzie automatycznie odświeżał nasza stronę po każdej zmianie jest dostępny pod komendą

```javascript
npm start
```

> **Uwaga!** webpack musi zawsze być uruchomiony jeśli nasza strona ma działać.

### json-server

Tą paczkę będziemy isntalować globalnie dlatego warto mieść uprawnienia administratora (sudo na Linux-ie), aby móc to zrobić.

W terminalu wpisujemy komendę:

```
npm install -g json-server@0.15
```

Po instalacji powinniśmy mieć dostęp do informacji o zainstalowanej wersji

```
json-server -v
```

Teraz w katalogu głównym naszej aplikacji tj `react-calendar` utworzymy sobie katalog `db`, a w nim stworzymy plik `data.json` i wrzucimy testowe dane tj.

```javascript
{
    "meetings": [
        {
            "firstName": "Jan",
            "lastName": "Kowalski",
            "email": "jan@kowalski.not",
            "date": "2022-01-01",
            "time": "10:00",
            "id": 1
        }
    ]
}
```

Jeśli masz już uruchomienego webpacka (`npm start`), to w kolejnym terminalu (lub wierszu poleceń) powinismy odpalić nasze API tj.

```
json-server --watch ./db/data.json --port 3005
```

Ustawiamy inny port niż domyślny tj. 3000 ponieważ na nim działa nasz webpack.

Od teraz możesz korzystać z API pod adresem:

```
http://localhost:3005/meetings
```

> **Uwaga!** json-server musi zawsze być uruchomiony jeśli API ma działać.

## Implementacja zadania

W katalogu głównym naszego projektu w katalogu `src` znajdują się nasze źródła.

Utwórzmy tam katalog `components` i tam przechwujmy wszystkie nasze komponenty.

Każdy komponent powinien być umiesczony w osobnym pliku. Trzymajmy się konwencji, że każdy plik zawiera tylko klasę, którą eksportuje.

Plik powinien się nazywać tak jak nazwa klasy (pozostawiąc wielką literę).

Na początek proponuje 3 komponenty

### Calendar

Renderuje pozostałe komponenty oraz zawiera w `state` listę dat do wyświetlenia.
To ten komponent posiada metody, które odpytują API w celu pobrania lub ustawienia danych.

> Uwaga! Docelowo kod odpowiedzialny za odpytywanie API najlepiej trzymać w osobny pliku np. `calendarProvider.js`. W samym komponencie uruchamiamy odpowiednią metodę, w której obsługujemy odpowiedź z API.

Pamiętaj, aby odpowiednie przygodować fetch:

```javascript
fetch(this.apiUrl, {
  method: "POST",
  body: data,
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    }

    throw new Error("Network error!");
  })
  .then(resp => {
    console.log(resp);
  });
```

### CalendarList

Renderuje listę wszystkich aktualnych dat, wyszkorzystując dane przekazane przez `props` z `Calendar`.

### CalendarForm

Renderuje formularz, elementy formularza są kontrolowane przez `state` więc komponent ten możemy nazwać kontrolowanym.

W momencie wysłania formularza (event `submit`, pamietamy o `.preventDefault()`) należy uruchomić odpowiednią metodą przekazaną przez `props`, która zaaktualizuje state oraz wyśle nowe dane do API.

W momencie wysyłania danych powinniśmy sprawdzić czy są one prawidłowe:

- firstName - ciąg znaków zawierający conajmniej 2 znaki
- lastName - ciąg znaków zawierający conajmniej 2 znaki
- email - poprawny adres email - najlepiej będzie użyć [wyrażeń regularnych](https://kursjs.pl/kurs/regular.php)

- date - poprawny format: YYYY-mm-dd, również użyjemy wyrażenia regularne

- time - poprawny format: HH:mm, również użyjemy wyrażenia regularne

Jeśli tak to wywołujemy metodą z `props` jeśli nie to wyświetlamy odpowiedni komunikat użytkownikowi.

## Dodatkowe zadania

> Nie wykonuj powyższych zadań zanim nie zrobisz podstawowej funkcjonalności

### Zadanie dodatkowe 1

Spróbuj podzielić to zdanie na mniejsze "kawałki" tj. komponenty. Zastanów się, które elementy HTML występują wieloktronie i zastąp je komponentami.

Przykładem może być np. element zawierający informacje o konkretnym spotkaniu. Tutaj moglibyśmy utworzyć `CalendarItem`.

### Zdanie dodatkowe 2

Wykorzystując odpowiednie style (zobacz plik `App.css` jak wygląda i jak jest podpiety do `App.js`) utwórz rozwiązanie, które pozwoli wyświetlać użytkownikowi podpowiedzi tzw. autocomplete - [przykład z jQuery](https://jqueryui.com/autocomplete/).

Powiedzmy, że w momencie, gdy użytkownik wpisuje dane do pola formularza to wykonujemy zapytanie do API, które zwraca nam wszystkie dane, które zaczynają się od podanych znaków.

Jak spojrzymy do [dokumentacji json-server-a](https://github.com/typicode/json-server#operators) to zauważymy, że możemy wykorzystać coś takiego:

```
/meetings?firstName_like=Ja

```

Powiniśmy w ten sposób wyszukać wszystkie dane, które posiadają imię zaczynające się na `Ja`.

Mając już ten dane (pewnie przechowywane w `state`) powinniśmy je wyswietlić użytkownikowi poniżej inputa, do którego wprowadzał dane (pewnie bez `position: relative` + `absolute` się nie obejdzie).

Po kliknięciu przez użytkownika w element z listy zostanie uzupełniony input jego zawartością.

## Refaktoryzacja

> Dokonaj refaktoryzacji co najmniej po skońcoznej i działającej podstawowej funkcjonalności

Zastanów się jakie elementy Twojego kodu można poprawić. Być może część kodu można napisać sprawniej i czytelniej?

Postaraj się podzielić kod na mniejsze cześci dzięki metodom w klasie, które realizują po 1 konkretnym zadaniu - np. `getDataFromAPI()`, `postDataToAPI(data)`

Zastanów się np. czy przez `props` do `CalendarForm` nie można przekazać pól formularza w taki sposób, aby były one generowane autoamtycznie np.

```javascript
<CalendarForm
  fields={[
    {
      name: "firstName",
      label: "Imię",
      regex: /[\w]+/
    }
    // ...
  ]}
/>
```
