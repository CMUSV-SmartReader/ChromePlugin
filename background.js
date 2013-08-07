
function recurr() {
	ThermoReader.addPageView();
	setTimeout(recurr, 60000);
	
}
recurr();
