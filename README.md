> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 

&nbsp;


# React Calendar

Twój znajomy [CEO](https://pl.wikipedia.org/wiki/Dyrektor_generalny) ma problem z organizacją, ponieważ ciężko mu bez zbiorczej listy spotkań odpowiednio ustawić plan dnia.

Ty jako dobry kolega (i dobry programista) postanowiłeś mu pomóc – mając z tyłu głowy, że projekt może się rozwinąć.

Wykorzystaj bibliotekę React do zbudowania prostej aplikacji z bazą danych przechowującą informacje o terminach spotkań.

Przez formularz pobieraj dane: datę, godzinę, imię, nazwisko oraz e-mail.

Zwróć szczególną uwagę na kompozycję (czyli podział na mniejsze komponenty) oraz odpowiednie umiejscowienie i wykorzystanie `state` w celu komunikacji komponentów poprzez `props`.

Dane przechowuj w pliku `.json` i pobieraj za pomocą lokalnego API. Wykorzystaj do tego gotowe rozwiązanie – [json-server](https://github.com/typicode/json-server).

Jeśli mamy API, to będziemy chcieli wykorzystać metodę `.fetch()` do pobierania i zapisywania danych.

## Niezbędne narzędzia

Musimy przygotować nasze miejsce pracy. Projekt jest mały, więc na początku wykorzystamy gotowe rozwiązania, aby nie tracić czasu na konfigurację. Najważniejsze jest działające [MVP](http://www.biznesowerewolucje.com/mvp-minimum-viable-product-praktycznie/).

### Create React App

Wykorzystamy paczkę z npm w celu skonfigurowania Reacta. Jeśli masz Node.js w wersji 10.16 lub wyższej oraz npm w wersji 5.2 lub wyższej, to wystarczy, że uruchomisz:

```
npx create-react-app@3 .
```

Znak `.` oznacza, że struktura aplikacji zostanie utworzona w obecnej lokalizacji. Spora część z tych elementów nie będzie przez Ciebie wykorzystywana, ale w tej chwili się tym nie przejmuj.

**Uwaga!** Instalacja wszystkich zależności może trochę potrwać, dlatego uzbrój się w cierpliwość. Nie muszę chyba wspominać, że dostęp do Internetu jest niezbędny, aby instalować pakiety :)

Jeśli nie jesteś pewny, jaką wersją aplikacji posiadasz, sprawdzisz to za pomocą flagi `-v`.

```javascript
node - v;
npm - v;
```

Po instalacji możesz też sprawdzić, czy Twoje repozytorium posiada poprawny adres zdalnego repozytorium:

```
git remote -v
```

Jeśli w konsoli zobaczysz adres zawierający Twój login, to oznacza, że możemy bez obaw pushować zmiany na GitHuba.

Lokalny serwer, który będzie automatycznie odświeżał naszą stronę po każdej zmianie, uruchomisz komendą:

```javascript
npm start
```

> **Uwaga!** Jeśli nasza strona ma działać, webpack zawsze musi być uruchomiony.

### JSON Server – przypomnienie

Paczka `json-server` powinna być zainstalowana globalnie, dlatego warto mieć uprawnienia administratora (sudo na Linuksie), aby móc to zrobić.

W terminalu wpisz komendę:

```
npm install -g json-server@0.17
```

Po instalacji powinieneś mieć dostęp do informacji o zainstalowanej wersji:
```
json-server -v
```

Teraz w katalogu głównym naszej aplikacji utwórz katalog  `db`, a w nim plik  `data.json`  i wrzuć do niego testowe dane, np.:

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

Jeśli masz już uruchomionego webpacka (`npm start`), to w kolejnym terminalu (wierszu poleceń) uruchom API:
```
json-server --watch ./db/data.json --port 3005
```

Ustawiamy inny port niż domyślny (3000), aby być pewnym, że nic go nie blokuje.

Od teraz możesz korzystać z API pod adresem:

```
http://localhost:3005/meetings
```

> **Uwaga!**  Jeśli API ma działać, json-server zawsze musi być uruchomiony.
> 
## Implementacja

W katalogu `src` znajdują się nasze źródła – utwórzmy w nim katalog `components` i tam przechowujmy wszystkie nasze komponenty.

Każdy komponent powinien być umieszczony w osobnym pliku. Trzymajmy się konwencji, że każdy plik zawiera tylko klasę, którą eksportuje.

Plik powinien się nazywać tak jak klasa i również zaczynać się wielką literą.

Na początek proponuję trzy komponenty.

### Calendar

Renderuje pozostałe komponenty oraz zawiera w `state` listę spotkań do wyświetlenia.
To ten komponent posiada metody, które odpytują API w celu pobrania lub ustawienia danych.

> **Uwaga!** Docelowo kod odpowiedzialny za odpytywanie API najlepiej trzymać w osobny pliku, np. `calendarProvider.js`. W samym komponencie uruchamiamy wówczas już tylko odpowiednią metodę, w której obsługujemy odpowiedź z API.

Pamiętaj, aby odpowiednio przygotować `.fetch()`:

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

Renderuje listę wszystkich aktualnych spotkań, wykorzystując dane przekazane przez `props` z `Calendar`.

### CalendarForm

Renderuje formularz. Elementy formularza są kontrolowane przez `state`, więc komponent ten możemy nazwać kontrolowanym.

Przed wysłaniem formularza, powinniśmy zweryfikować poprawność wprowadzonych danych (wykonać walidację) i sprawdzić czy:

- `firstName` to ciąg znaków zawierający co najmniej 2 znaki
- `lastName` to ciąg znaków zawierający co najmniej 2 znaki
- `email` to poprawny adres e-mail
- `date` ma poprawny format: YYYY-mm-dd
- `time` ma poprawny format: HH:mm

Do sprawdzenia adresu e-mail, daty i czasu najlepiej będzie użyć [wyrażeń regularnych](https://kursjs.pl/kurs/regular/regular.php).

Jeśli dane są niepoprawne, wyświetlamy użytkownikowi odpowiedni komunikat.

Jeśli dane są poprawne, wysyłamy je (event `submit`; pamiętajmy o `.preventDefault()`) i uruchamiamy odpowiednią metodę przekazaną przez `props`, która zaktualizuje stan w `<Calendar />` oraz wyśle nowe dane do API.

&nbsp;

## Zadania dodatkowe

> Nie wykonuj zadań dodatkowych zanim nie zrobisz podstawowej funkcjonalności.

### Zadanie 1

Spróbuj podzielić naszą aplikację na „kawałki”, czyli mniejsze komponenty. Zastanów się, które elementy HTML występują wielokrotnie i zastąp je komponentami.

Przykładem jest element zawierający informacje o konkretnym spotkaniu. Tutaj moglibyśmy utworzyć `CalendarItem`.

### Zadanie 2

Wykorzystując odpowiednie style (zobacz plik `App.css` – jak wygląda i jak jest podpięty do `App.js`) stwórz rozwiązanie, które pozwoli wyświetlać użytkownikowi podpowiedzi, tzw. autocomplete ([przykład z jQuery](https://jqueryui.com/autocomplete/)).

Gdy użytkownik będzie wpisywał dane do pola formularza, to wykonamy zapytanie do API. W odpowiedzi otrzymamy wszystkie wartości, które zaczynają się od podanych znaków.

W [dokumentacji json-servera](https://github.com/typicode/json-server#operators) znajdziesz informację o tym, że możemy wykorzystać filtrowanie względem zapytania:

```
/meetings?firstName_like=Ja

```

Powinniśmy w ten sposób wyszukać wszystkie imiona zaczynające się na `Ja`.

Otrzymane dane (pewnie przechowywane w `state`) wyświetlimy użytkownikowi poniżej uzupełnianego inputa (pewnie bez `position: relative` + `absolute` się nie obejdzie).

Po kliknięciu przez użytkownika w element z listy input zostanie uzupełniony wskazaną wartością.

## Refaktoryzacja

> Dokonaj refaktoryzacji co najmniej po skończonej i działającej podstawowej funkcjonalności

Zastanów się, jakie elementy Twojego kodu można poprawić. Być może część kodu można napisać lepiej i czytelniej?

Postaraj się podzielić kod na mniejsze części: metody, które realizują po jednym konkretnym zadaniu, np. `getDataFromAPI()`, `postDataToAPI(data)`.

Przemyśl, czy przez `props` do `CalendarForm` nie można przekazać pól formularza w taki sposób, aby były one generowane automatycznie, np.

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


&nbsp;

> ⭐ ***README** to coś więcej niż opis. Poprzez nie **pokazujesz swoje mocne strony** – swoją dokładność, sposób myślenia i podejście do rozwiązywania problemów. Niech Twoje README pokaże, że masz **świetne predyspozycje do rozwoju!***
> 
> 🎁 *Zacznij od razu. Skorzystaj z **[szablonu README i wskazówek](https://github.com/devmentor-pl/readme-template)**.* 
