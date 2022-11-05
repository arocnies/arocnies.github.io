---
title: " Number To Phrase (Code Kata)"
date: 2022-08-17 17:17:19 -0400
category: [Code Snippet]
tags: [kotlin, kata, functional]
author: anies
thumbnail: /assets/posts/kata/fun.png
---
Code Katas are a powerful tool for gaining new perspectives on how we model solutions in code. Katas in particular are coding puzzles for which _an_ answer is already known. The key is repeating the answer to build muscle memory and improve the answer to become more effective as a programmer.

A coworker of mine presented me with a Kata they were using to learn and compare languages. The program shall convert numbers to the English phrase.

>2 becomes "two"
>
>152 becomes "one hundred fifty two"
>
>12,019 becomes "twelve thousand nineteen".

Solving the Kata was pretty enjoyable and the different approaches were interesting.

My coworker's solution used integer math to separate sections of the number to convert to a string.

I traded the number practice for functional operations and I went the route of all string and no numbers. Which had the added benefit of scaling past max int.

Number phrasing isn't too complex. Groups of three (triples) with special cases for 0 and 1-19. Each triple has a name (i.e. Thousands, millions, etc). This page on [Names of Large Numbers](https://simple.m.wikipedia.org/wiki/Names_of_large_numbers) came in handy.

Here's my solution, about **~20 lines** of meat excluding the word lists.

<script src="https://unpkg.com/kotlin-playground@1" data-selector="kcode"></script>

<kcode from="1" to="22" theme="darcula" lines="true" match-brackets="true">
fun numberToWord(number: String): String = if (number == "0") "zero" else number
    .chunkedRightToLeft(3)
    .map { tripleDigitsToWord(it.toString()) }
    .mapIndexed { index, triple -> if (triple.isNotBlank()) "$triple ${thousands[index]}" else "" }
    .filter { it.isNotBlank() }
    .asReversed()
    .joinToString(" ") { it.trim() }

fun CharSequence.chunkedRightToLeft(size: Int) = this.reversed().chunked(size) { it.reversed() }

fun tripleDigitsToWord(number: String): String {
    require(number.length <= 3) { "$number is must be 3 or less digits" }
    val (hundredsDigit, tensDigit, onesDigit) = number.padStart(3, '0').map { it.digitToInt() }

    val hundredsWord = if (hundredsDigit > 0) "${singles[hundredsDigit]} hundred" else ""
    val tensWord = if (tensDigit > 1) tens[tensDigit] else ""
    val onesWord = if (tensDigit <= 1) singles[(tensDigit * 10) + onesDigit] else singles[onesDigit]

    return listOf(hundredsWord, tensWord, onesWord)
        .filterNot { it.isBlank() }
        .joinToString(" ")
}
<textarea class="hidden-dependency">
import kotlin.test.assertEquals

val tests = mapOf(
"0" to "zero",
"1" to "one",
"10" to "ten",
"20" to "twenty",
"21" to "twenty one",
"110" to "one hundred ten",
"121" to "one hundred twenty one",
"1001" to "one thousand one",
"1121" to "one thousand one hundred twenty one",
"21001" to "twenty one thousand one",
"100001" to "one hundred thousand one",
"123456789012" to "one hundred twenty three billion four hundred fifty six million seven hundred eighty nine thousand twelve",
"1000000000000" to "one trillion",
"1".padEnd(121, '0') to "one novemtrigintillion"
)

fun main() {
tests.forEach { (number, phrase) ->
println("$number -> ${numberToWord(number)}")
assertEquals(phrase, numberToWord(number))
}
}
</textarea>
val singles = listOf(
"",
"one",
"two",
"three",
"four",
"five",
"six",
"seven",
"eight",
"nine",
"ten",
"eleven",
"twelve",
"thirteen",
"fourteen",
"fifteen",
"sixteen",
"seventeen",
"eighteen",
"nineteen",
)

val tens = listOf(
"",
"",
"twenty",
"thirty",
"forty",
"fifty",
"sixty",
"seventy",
"eighty",
"ninety",
)

val thousands = listOf(
"",
"thousand",
"million",
"billion",
"trillion",
"quadrillion",
"quintillion",
"sextillion",
"septillion",
"octillion",
"nonillion",
"decillion",
"undecillion",
"doudecillion",
"tredecillion",
"quattuordecillion",
"quindecillion",
"sexdecillion",
"septendecillion",
"octodecillion",
"novemdecillion",
"vigintillion",
"unvigintillion",
"duovigintillion",
"trevigintillion",
"quattuorvigintillion",
"quinvigintillion",
"sexvigintillion",
"septenvigintillion",
"octovigintillion",
"novemvigintillion",
"trigintillion",
"untrigintillion",
"duotrigintillion",
"tretrigintillion",
"quattuortrigintillion",
"quintrigintillion",
"sextrigintillion",
"septentrigintillion",
"octotrigintillion",
"novemtrigintillion"
)
</kcode>


