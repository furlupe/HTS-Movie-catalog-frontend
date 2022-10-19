function showReviews(reviews) {
    $template = $(".review-template")
    for(var review of reviews) {
        $r = $template.clone();
        $r.removeClass("d-none");

        var avatar = review.author.avatar;
        var color = (review.rating > 5) ? "success" : "danger";

        $r.addClass(`border-${color}`);

        $r.find(".user-avatar").attr("src", (avatar) ? avatar : "");
        $r.find(".user-name").text(review.author.nickName);
        $r.find(".review-date").text(review.createDateTime);

        $r.find(".review-rating").text(review.rating)
        .addClass(`bg-${color}`);

        $r.find(".review-text").text(review.reviewText)
        .addClass(`text-${color}`);

        $("#reviews").append($r);
    }
}