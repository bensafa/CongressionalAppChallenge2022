function openTab(tabName) {
    $(".tabcontent").addClass("hide");
    $(`#${tabName}`).removeClass("hide");
}