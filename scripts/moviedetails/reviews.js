function showReviews(reviews, userId) {
    $template = $(".review-template")
    for(var review of reviews) {
        $r = $template.clone();
        $r.removeClass("d-none");

        var avatar = review.author.avatar;
        var color = (review.rating > 5) ? "success" : "danger";

        $r.addClass(`border-${color}`);

        $r.find(".user-avatar").attr("src", (avatar) ? avatar : "");
        $r.find(".user-name").text(review.author.nickName);
        $r.find(".review-date").text((new Date(review.createDateTime)).toLocaleDateString());

        $r.find(".review-rating").text(review.rating)
        .addClass(`bg-${color}`);

        $r.find(".review-text").text(review.reviewText)
        .addClass(`text-${color}`);
        
        if (userId == review.author.userId) {
            $r.find(".card-footer").removeClass( "d-none");
            localStorage.setItem("userMadeReview", "1");
        }

        $("#reviews").append($r);
    }
}
