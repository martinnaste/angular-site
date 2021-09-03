function randomData(data){
    data.forEach(element => {
        temp = Math.floor(Math.random() * 10) + 1;
        element.value = temp;
    });
    return data;
}