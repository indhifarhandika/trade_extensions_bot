
function main() {
    setTimeout(() => {
        var stringDataBuy = ""
        var stringDataSell = ""
        // Coin Name
        var coin = document.querySelector("#__layout > section > section > dl.l > dt > div > div.ticker > span.symbol-name").innerText
        var coin_filter = coin.toLowerCase().split("/")
        // Filter Nama Tabel
        var namaTabel = "huobi_" + coin_filter[0] + "_" + coin_filter[1].substring(" ", coin_filter[1].length - 1)

        for (let index = 2; index <= 11; index++) {
            var dataBuy = document.querySelector("#__layout > section > section > dl.r > dt > div.mod.order-books > div.mod-body > dl > dd > div.list.bids > p:nth-child(" + index + ")").innerText
            var dataSell = document.querySelector("#__layout > section > section > dl.r > dt > div.mod.order-books > div.mod-body > dl > dd > div.list.asks > p:nth-child(" + index + ")").innerText

            // Split and Join
            var splitDataBuy = dataBuy.split("\n")
            var splitDataSell = dataSell.split("\n")

            // Filter
            var dataBuyFix = splitDataBuy[0] + "x" + splitDataBuy[1] + "y" + splitDataBuy[2] + "z"
            var dataSellFix = splitDataSell[0] + "x" + splitDataSell[1] + "y" + splitDataSell[2] + "z"

            // Data siap post
            stringDataBuy += dataBuyFix
            stringDataSell += dataSellFix
        }
        // Post API

        const dataPost = { nama_tabel: namaTabel, buy: stringDataBuy, sell: stringDataSell }
        console.log(JSON.stringify(dataPost))
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

setTimeout(() => {
    main()
}, 5000)
