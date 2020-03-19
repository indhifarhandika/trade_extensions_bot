
function main() {
    setTimeout(() => {
        var stringDataBuy = ""
        var stringDataSell = ""
        // URL
        var coin = document.querySelector("body > section > div > div.mainpanel > div.contentpanel > div:nth-child(1) > div.col-lg-8 > div:nth-child(1) > div > div.spot-title-container > h5").innerText
        var coin_filter = coin.toLowerCase().split("/")
        var namaTabel = "indodax_" + coin_filter[0] + "_" + coin_filter[1]

        for (let index = 1; index <= 10; index++) {
            var dataBuy = document.querySelector("#buy_orders > tbody > tr:nth-child(" + index + ")").innerText
            var dataSell = document.querySelector("#sell_orders > tbody > tr:nth-child(" + index + ")").innerText

            // Split and Join
            var splitDataBuy = dataBuy.split("	")
            var splitDataSell = dataSell.split("	")

            // Filter
            var dataBuyFix = splitDataBuy[0] + "x" + splitDataBuy[1].split(",").join(".") + "y" + splitDataBuy[2].split(".").join("") + "z"
            var dataSellFix = splitDataSell[0] + "x" + splitDataSell[1].split(",").join(".") + "y" + splitDataSell[2].split(".").join("") + "z"

            // Data siap post
            stringDataBuy += dataBuyFix
            stringDataSell += dataSellFix
        }

        // Post API
        const dataPost = { nama_tabel: namaTabel, buy: stringDataBuy, sell: stringDataSell }
        // console.log(JSON.stringify(dataPost))

        // console.log(`http://localhost/Balancer/public/api/saveCoin/${namaTabel}/${stringDataBuy.substring("z", stringDataBuy.length - 1)}/${stringDataSell.substring("z", stringDataSell.length - 1)}`)
        fetch(`http://localhost/Balancer/public/api/saveCoin/${namaTabel}/${stringDataBuy.substring("z", stringDataBuy.length - 1)}/${stringDataSell.substring("z", stringDataSell.length - 1)}`)
            .then((response) => {
                return response;
            })
            .then((data) => {
                console.log(data);
            });
        main()
    }, 3000)
}

console.log("START")
setTimeout(() => {
    main()
}, 5000)
