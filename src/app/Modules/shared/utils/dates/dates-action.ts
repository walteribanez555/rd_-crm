export class DatesAction {
  quantityBetweenDates(initialDate: string, finalDate: string) {
    const mappedInitialDate = new Date(initialDate);
    const mappedFinalDate = new Date(finalDate);

    const differenceMiliseconds = Math.abs(
      mappedFinalDate.getTime() - mappedInitialDate.getTime()
    );

    const diferenciaDays = Math.ceil(
      differenceMiliseconds / (1000 * 60 * 60 * 24)
    );

    return diferenciaDays + 1;
  }


  yearsBetweenDates(initialDate:  string, finalDate : string) {

    const datenew = new Date(finalDate);
    const dateold = new Date(initialDate);

    var ynew = datenew.getFullYear();
    var mnew = datenew.getMonth();
    var dnew = datenew.getDate();
    var yold = dateold.getFullYear();
    var mold = dateold.getMonth();
    var dold = dateold.getDate();
    var diff = ynew - yold;
    if (mold > mnew) diff--;
    else {
        if (mold == mnew) {
            if (dold > dnew) diff--;
        }
    }
    return diff;
  }
}
