import * as authActions from "../authReducer/authActionCreators";
import * as roomActions from "../roomReducer/roomActionCreators";

export default {
    ...authActions,
    ...roomActions
}