const car = null;
window.addEventListener('message', function(event) {
    var item = event.data;

    if (item.type === "ui") {

        $(".sayfa").css('display', "block");

    } else if (item.type = 'updatee') {
        date();
        coincont();


    } else if (item.type = 'close') {
        $(".sayfa").css('display', "none");

    }
})

$(document).keydown(function(e) {

    if (e.keyCode == 27) {
        $('.sayfa').hide();
        $.post('http://codem-coinshop/escape');
    }
});

function date() {

    $.post("http://codem-coinshop/update", JSON.stringify({}), function(data) {
        coincont();
        $('#bir').attr("src", 'images/' + data[0].image);
        $(".yazi").html(data[0].label);
        $(".fiyat").html(data[0].coin);
        $(".carname").html(data[0].spawncode);

        $("#one").on("click", function() {
            $('#bir').attr("src", 'images/' + data[0].image);

            $(".yazi").html(data[0].label);
            $(".fiyat").html(data[0].coin);
            $(".carname").html(data[0].spawncode);
        })
        $("#two").on("click", function() {
            $(".yazi").html(data[1].label);
            $(".fiyat").html(data[1].coin);
            $('#bir').attr("src", 'images/' + data[1].image);
            $(".carname").html(data[1].spawncode);
        })
        $("#thre").on("click", function() {
            $(".yazi").html(data[2].label);
            $(".fiyat").html(data[2].coin);
            $('#bir').attr("src", 'images/' + data[2].image);
            $(".carname").html(data[2].spawncode);
        })
        $("#four").on("click", function() {
            $(".yazi").html(data[3].label);
            $(".fiyat").html(data[3].coin);
            $('#bir').attr("src", 'images/' + data[3].image);
            $(".carname").html(data[3].spawncode);
        })
        $("#five").on("click", function() {
            $(".yazi").html(data[4].label);
            $(".fiyat").html(data[4].coin);
            $('#bir').attr("src", 'images/' + data[4].image);
            $(".carname").html(data[4].spawncode);
        })
        $("#six").on("click", function() {
            $(".yazi").html(data[5].label);
            $(".fiyat").html(data[5].coin);
            $('#bir').attr("src", 'images/' + data[5].image);
            $(".carname").html(data[5].spawncode);
        })
        $("#seven").on("click", function() {
            $(".yazi").html(data[6].label);
            $(".fiyat").html(data[6].coin);
            $('#bir').attr("src", 'images/' + data[6].image);
            $(".carname").html(data[6].spawncode);
        })
        $("#eight").on("click", function() {
            $(".yazi").html(data[7].label);
            $(".fiyat").html(data[7].coin);
            $('#bir').attr("src", 'images/' + data[7].image);
            $(".carname").html(data[7].spawncode);
        })
        $("#nine").on("click", function() {
            $(".yazi").html(data[8].label);
            $(".fiyat").html(data[8].coin);
            $('#bir').attr("src", 'images/' + data[8].image);
            $(".carname").html(data[8].spawncode);
        })
        $("#ten").on("click", function() {
            $(".yazi").html(data[9].label);
            $(".fiyat").html(data[9].coin);
            $('#bir').attr("src", 'images/' + data[9].image);
            $(".carname").html(data[9].spawncode);
        })



    })


}

function coincont() {
    $.post('http://codem-coinshop/coinmiktar', JSON.stringify({}), function(cbData31) {
        $(".bakiyeyazi").html('Coin : ' + cbData31);
    });
}

$(".satinalma").click(function() {
    coincont();
    $(".satinalma").css('display', "none");
    $(".loader").css('display', "block");

    var vehicleprice = $('.container').parent().find('.fiyat').text();
    var vehiclename = $('.container').parent().find('.yazi').text();
    var spawncar = $('.container').parent().find('.carname').text();
    $.post("http://codem-coinshop/kontrol1", JSON.stringify({}), function(result) {

        if (vehicleprice < result) {
            coincont();
            notify(" The purchase is successful", "success")

            $.post("http://codem-coinshop/buy", JSON.stringify({
                vehicleprice: vehicleprice,
                vehiclename: vehiclename,
                spawncar: spawncar,
            }));
            setTimeout(function() {
                $(".loader").css('display', "none");
                $(".satinalma").css('display', "block");
            }, 3000);




        } else {
            coincont();
            notify("Insufficient balance.", "error")
            setTimeout(function() {
                $(".loader").css('display', "none");
                $(".satinalma").css('display', "block");
            }, 3000);
        }

    });

})




notify = function(text, type) {
    $(".notify").fadeOut(0)
    let renk = "#333"
    if (type == "error") {
        renk = "#A52A2A"
    } else if (type == "success") {
        renk = "#689f38"
    }
    $(".notify").fadeIn(100)
    $(".notify").html(text)
    $(".notify").css("background", renk);
    $(".notify").animate({ left: "50" }, 500, function() {
        setTimeout(() => {
            $(".notify").animate({ left: "50" }, 500, function() {
                $(".notify").fadeOut(100)
            });
        }, 1000);
    });
}