
# Gra Sokoban

  

Implementacja gry logicznej Sokoban w języku JavaScript, stworzona na konkurs Motorola Science Cup.

  

## Rozgrywka

  

1. Zasady gry

* Gracz porusza się magazynierem po 2-wymiarowej planszy.
* Na planszy są pudełka, które magazynier może przesuwać.
* Magazynier może przesuwać 1 pudełko na raz.
* Celem gry jest przesunięcie wszystkich pudełek na miejsca docelowe.
* Na planszy są przeszkody w postaci ścian, magazynier ani pudełka nie mogą się znaleźć na polu ze ścianą.
* Na podstawie ilości ruchów, jaką wykonał magazynier, przyznawana jest ilość zdobytych punktów.
* Gracz ma możliwość zresetowania poziomu i cofnięcia ruchu.
* Cofnięcie ruchu spowoduje utratę punktów.
* Gracz może wybrać rozgrywkę na 1 z 3 trybów.

2. Tryb gry 1
* Gracz ma możliwość wybory 1 z 3 trybów trudności (łatwy,  średnio zaawansowany, trudny).
* Gracz ma możliwość zmienienia wybranego poziomu trudności.
* Po wybraniu trybu losowany jest poziom o wybranym poziomie trudności.
* Gracz może wylosować inny, losowy poziom, o wybranym poziomie trudności.

3. Tryb gry 2
* Gracz zaczyna rozgrywkę na pierwszym z 20 poziomów.
* Aby przejść do następnego poziomu, gracz musi wygrać obecny poziom.
* Gracz może zapisać i wczytać grę.
* W każdej chwili gracz może przerwać rozgrywkę i dodać wynik do rankingu.
* W rankingu zapisywanych jest 10 najlepszych wyników.

4. Tryb gry 3
* Gracz może stworzyć i zapisać swój własny poziom.
* Gracz może wczytać i zagrać na stworzonym przez siebie poziomie.
* Gracz może usunąć stworzony przez siebie poziom.
* Gracz ma możliwość zapisania i wczytania gry.



## Uruchamianie
Grę można uruchomić lokalnie za pomocą rozszerzenia LiveServer lub zagrać w nią na stronie [http://sokoban.s3.warszawa.pl](http://sokoban.s3.warszawa.pl).

## Więcej informacji
Dokumentacja projektu znajduje się w docs\index.html