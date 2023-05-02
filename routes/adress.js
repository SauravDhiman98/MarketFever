const ShippingAdress = require("../models/ShippingAdress");
const User = require("../models/User");
const UserAddress = require("../models/UserAddress");

const router = require("express").Router();

router.get("/getuseradress/:id", async (req, res) => {
  try {
    const findUserById = await User.findOne({ _id: req.params.id }).populate(
      "userAddress"
    );
    if (findUserById.userAddress.length != 0) {
      res.status(200).json(findUserById.userAddress);
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
});

router.post("/AddressOfUser", async (req, res) => {
  try {
    const getUserById = await User.findOne({ _id: req.body.id }).populate(
      "shippingAdress"
    );
    if (getUserById != null) {
      const UserShippingAdress = new ShippingAdress({
        flatNumber: req.body.userData.flatNumber,
        nearByMark: req.body.userData.nearByMark,
        fullAddress: req.body.userData.fullAddress,
        phoneNumber: req.body.userData.phoneNumber,
        altPhoneNumber: req.body.userData.altPhoneNumber,
        pinCode: req.body.userData.pinCode,
        state: req.body.userData.state,
      });

      const userAddress = new UserAddress({
        flatNumber: req.body.userData.flatNumber,
        nearByMark: req.body.userData.nearByMark,
        fullAddress: req.body.userData.fullAddress,
        phoneNumber: req.body.userData.phoneNumber,
        altPhoneNumber: req.body.userData.altPhoneNumber,
        pinCode: req.body.userData.pinCode,
        state: req.body.userData.state,
      });
      if (getUserById.shippingAdress.length == 0) {
        await userAddress.save();
        await UserShippingAdress.save();
        getUserById.shippingAdress.push(UserShippingAdress);
        getUserById.userAddress.push(userAddress);
        await getUserById.save();
        res.status(201).json({ status: 201 });
      } else {
        const adressToDelete = await ShippingAdress.deleteOne({
          phoneNumber: getUserById.shippingAdress[0].phoneNumber,
        });
        getUserById.shippingAdress.splice(0, getUserById.shippingAdress.length);
        await userAddress.save();
        await UserShippingAdress.save();
        getUserById.shippingAdress.push(UserShippingAdress);
        getUserById.userAddress.push(userAddress);
        await getUserById.save();
        res.status(201).json({ status: 201 });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

router.post("/updateshippingadress", async (req, res) => {
  try {
    const indx = req.body.indx;
    const getUserById = await User.findOne({ _id: req.body.id })
      .populate("userAddress")
      .populate("shippingAdress")
      const adressToDelete = await ShippingAdress.deleteOne({
        phoneNumber: getUserById.shippingAdress[0].phoneNumber
    });
    if(adressToDelete.deletedCount == 1){
        const getShippingAdresArray = getUserById.userAddress[req.body.indx];
        const UserShippingAdress = new ShippingAdress({
            flatNumber: getShippingAdresArray.flatNumber,
            nearByMark: getShippingAdresArray.nearByMark,
            fullAddress: getShippingAdresArray.fullAddress,
            phoneNumber: getShippingAdresArray.phoneNumber,
            altPhoneNumber: getShippingAdresArray.altPhoneNumber,
            pinCode: getShippingAdresArray.pinCode,
            state: getShippingAdresArray.state,
          });
        await UserShippingAdress.save();
        getUserById.shippingAdress.splice(0, getUserById.shippingAdress.length);
        getUserById.shippingAdress.push(UserShippingAdress);
        await getUserById.save();
        res.status(201).json({ status: 201 });
    }
  } catch (err) {
    console.log(err);
    res.status(409).json(err)
  }
});

module.exports = router;
