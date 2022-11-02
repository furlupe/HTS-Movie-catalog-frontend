export function countAvgRating(movie) {
    return movie.reviews.length < 1 ? 
    "Нет" : 
    (movie.reviews.map((review) => { 
        return review.rating 
    })
    .reduce((a, b) => {
        return a + b
    }, 0) / movie.reviews.length).toFixed(1);
}

export function formatMoney(money, currency = "$") {
    if(!money) return "Неизвестно"

    money = money.toString();
    var head = `${currency}${
        money.slice(0, (money.length % 3 > 0) ? money.length % 3 : 3)
    }`;
    
    var body = ""
    for(var i = head.length - 1; i < money.length; i += 3) {
        body += ` ${money.slice(i, i + 3)}`;
    }
    return head + body;
}