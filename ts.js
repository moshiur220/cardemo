const logger = require("../../../libs/logger");
const Order = require("../../../v3/orders/models/index");
const OrderCollection = require("../../../v4/orders/models/orderCollections");
const moment = require("moment");
const BigNumber = require("bignumber.js");
const { info } = require("winston");
const OrderDeposit = require("../../../v4/orders/models/orderDeposit");
module.exports = {
  // get all orders
  getAllOrders: async function (req, res, next) {
    try {
      const respond = await Order.find({});
      return res.status(200).json({
        success: true,
        message: "All orders fetched successfully!",
        data: respond,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  simpleController: async function (req, res, next) {
    console.log("simpleController");
    res.status(200).json({
      success: true,
      message: "All Referral fetched successfully!",
      data: respond,
    });
  },
  getOrderAmountCollectionByOrderId: async function (req, res, next) {
    console.log(req.params.order_id);
    if (req.params.order_id) {
      try {
        const response = await OrderCollection.find({
          order_id: req.params.order_id,
        });
        res.status(200).json({
          success: true,
          message: "All Referral fetched successfully!",
          data: respond,
        });
        console.log("response amount", response);
        return response;
      } catch (error) {
        res.status(501).json({
          success: false,
          message: "Error in All Referral fetched successfully!",
          error: error,
        });
      }
    } else {
      res.status(501).json({
        success: false,
        message: "Error in All Referral fetched successfully!",
        error: "order_id is required",
      });
    }
  },
  // get order by limit and page
  getOrdersByLimitAndPage: async function (req, res, next) {
    try {
      const limit = req.query.limit;
      const page = req.query.page;
      const respond = await Order.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit);
      return res.status(200).json({
        success: true,
        message: "All orders fetched successfully!",
        data: respond,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },

  // collector controller
  getOrderForCollector: async function (req, res, next) {
    if (req.params.id) {
      console.log(req.params.id);
      try {
        const respond = await Order.find({
          "payment_term.collectorId": req.params.id,
        });
        return res.status(200).json({
          success: true,
          message: "All orders fetched successfully!",
          data: respond,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error,
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "Please provide Id",
        // error: error,
      });
    }
  },

  // driver controller
  getOrderForDriver: async function (req, res, next) {
    if (req.params.id) {
      console.log(req.params.id);
      try {
        const respond = await Order.find({
          driverId: req.params.id,
        });
        return res.status(200).json({
          success: true,
          message: "All orders fetched successfully!",
          data: respond,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error,
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "Please provide Id",
        // error: error,
      });
    }
  },
  getDepositDetailsByUser: async function (req, res, next) {
    console.log(req.params.id);
    try {
      const respond = await OrderDeposit.findById(req.params.id);
      return res.status(200).json({
        success: true,
        message: "All orders fetched successfully!",
        data: respond,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  allDepositListByCad: async function (req, res, next) {
    // console.log(req.params.id);
    try {
      const limit = req.query.limit;
      const page = req.query.page;
      const countResponse = await OrderDeposit.countDocuments({
        //"created_by_user.country": req.query.country,
      });
      const respond = await OrderDeposit.find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit);
      return res.status(200).json({
        success: true,
        message: "All orders fetched successfully!",
        data: respond,
        meta: {
          count: countResponse,
          page: Number(req.query.page),
          limit: Number(req.query.limit),
          //search: searchResponse,
          search: 0,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  getDepositFilterByStatus: async function (req, res, next) {
    console.log("=======>");
    console.log(req.params.status);
    try {
      const respond = await OrderDeposit.find({
        status: req.params.status,
        userId: req.authUser.user._id,
      });
      return res.status(200).json({
        success: true,
        message: "All orders fetched successfully!",
        data: respond,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  getDepositList: async function (req, res, next) {
    // console.log(req.params.id);
    try {
      const respond = await OrderDeposit.find({
        userId: req.authUser.user._id,
      }).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        message: "All orders fetched successfully!",
        data: respond,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  getDriveCollectorList: async function (req, res, next) {
    // console.log(req.params.id);
    if (req.query.assign) {
      if (req.query.assign === "drive") {
        if (req.query.status) {
          try {
            const respond = await Order.find({
              driverId: req.authUser.user._id,
              order_status: req.query.status,
            });
            return res.status(200).json({
              success: true,
              message: "All orders fetched successfully!",
              data: respond,
            });
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: "Internal server error",
              error: error,
            });
          }
        } else {
          try {
            const respond = await Order.find({
              driverId: req.authUser.user._id,
            });
            return res.status(200).json({
              success: true,
              message: "All orders fetched successfully!",
              data: respond,
            });
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: "Internal server error",
              error: error,
            });
          }
        }
        // order_status
      } else {
        if (req.query.status) {
          try {
            const respond = await Order.find({
              "payment_term.collectorId": req.authUser.user._id,
              order_status: req.query.status,
            });
            return res.status(200).json({
              success: true,
              message: "All orders fetched successfully!",
              data: respond,
            });
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: "Internal server error",
              error: error,
            });
          }
        } else {
          try {
            const respond = await Order.find({
              "payment_term.collectorId": req.authUser.user._id,
            });
            return res.status(200).json({
              success: true,
              message: "All orders fetched successfully!",
              data: respond,
            });
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: "Internal server error",
              error: error,
            });
          }
        }
      }
    } else {
      return res.status(500).json({
        success: false,
        message: "Please send status ?assign=drive",
        error: error,
      });
    }
  },
  getDepositAmountByUser: async function (req, res, next) {
    const depositDetails = { totalAmount: 0, totalCount: 0 };

    try {
      console.log("================>");
      console.log(req.query);
      console.log(req.authUser.user);

      and_query = [
        // {
        //   createdAt: {
        //     $gte: new Date(req.query.date_start),
        //     $lte: new Date(req.query.start_end),
        //   },
        // },
        {
          $or: [
            { userId: req.authUser.user._id },
            // { "buyer.parent._id": req.authUser.business._id },
          ],
        },
        { status: "Verified" },
      ];
      let queryResult = await OrderDeposit.aggregate([
        {
          $match: {
            $and: and_query,
          },
        },
        {
          $group: {
            _id: null,
            payAmount: { $sum: "$payAmount" },
            depositCount: { $sum: 1 },
            // currency: { $first: "$currency" },
          },
        },
      ]);

      if (queryResult.length !== 0) {
        depositDetails.totalAmount = queryResult[0].payAmount;
        depositDetails.totalCount = queryResult[0].depositCount;
      }

      // return queryResult;
      return res.status(200).json({
        success: true,
        message: "Deposit data fetched successfully!",
        data: depositDetails,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  postNewDeposit: async function (req, res, next) {
    try {
      console.log("=========================>");
      console.log(req.body);
      const response = await OrderDeposit.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Deposit created successfully!",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  postUpdateDeposit: async function (req, res, next) {
    try {
      console.log("=========================>");
      console.log(req.body);
      const response = await OrderDeposit.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      return res.status(201).json({
        success: true,
        message: "Deposit created successfully!",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  collectorCollectionDetails: async function (req, res, next) {
    console.log(req.query);
    if (req.query.start && req.query.end) {
      try {
        console.log("================>");
        console.log(req.query);
        console.log(req.authUser.user);

        and_query = [
          {
            createdAt: {
              $gte: new Date(req.query.start),
              $lte: new Date(req.query.end),
            },
          },
          {
            $or: [
              { userId: req.authUser.user._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          // { order_status: status },
        ];
        let queryResult = await OrderCollection.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$amount" },
              total_orders: { $sum: 1 },
              // currency: { $first: "$currency" },
            },
          },
        ]);
        // return queryResult;
        return res.status(200).json({
          success: true,
          message: "Collector data fetched successfully!",
          data: queryResult,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error,
        });
      }
    } else {
      try {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.start_end),
          //   },
          // },
          {
            $or: [
              { userId: req.authUser.user._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          // { order_status: status },
        ];
        let queryResult = await OrderCollection.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$amount" },
              total_orders: { $sum: 1 },
              // currency: { $first: "$currency" },
            },
          },
        ]);
        // return queryResult;
        return res.status(200).json({
          success: true,
          message: "Collector data fetched successfully!",
          data: queryResult,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error,
        });
      }
    }
  },

  // get order by limit and page
  getCadOrdersByLimitAndPage: async function (req, res, next) {
    var respond = [];
    try {
      //created_by_user.country

      const countResponse = await Order.countDocuments({
        "created_by_user.country": req.query.country,
      });
      // console.log(countResponse);
      const limit = req.query.limit;
      const page = req.query.page;
      const searchResponse = await Order.find({ order_id: req.query.search });

      if (req.query.day) {
        console.log(moment().add(req.query.day, "days"));
        let addDay = moment().utc().subtract(req.query.day, "days");
        console.log(new Date(addDay));
        respond = await Order.find({
          "created_by_user.country": req.query.country,
          "payment_term.paymentDueDate": {
            $gte: new Date(addDay),
            $lte: new Date(moment().utc()),
          },
          // {$gte: date}
        })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip((page - 1) * limit);
      } else {
        respond = await Order.find({
          "created_by_user.country": req.query.country,
        })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip((page - 1) * limit);
      }
      // console.log(respond);
      return res.status(200).json({
        success: true,
        message: "All orders fetched successfully!",
        data: req.query.search === "" ? respond : searchResponse,
        meta: {
          count: countResponse,
          page: Number(req.query.page),
          limit: Number(req.query.limit),
          search: searchResponse,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  // get order by id
  getOrderById: async function (req, res, next) {
    try {
      const respond = await Order.findById(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: respond,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  // get order fineOne by order_id
  getOrderByOrderId: async function (req, res, next) {
    try {
      const respond = await Order.findOne({ order_id: req.params.order_id });
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: respond,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },

  getOrderStatusByDayDetailsCustom: async function (req, res, next) {
    let and_query = [];
    let orderAnalyTicObj = {
      totalOrder: 0,
      totalAmount: 0,
      paid: 0,
      delivered: 0,
      partially_paid: 0,
      partially_delivered: 0,
      cancel: 0,
      placed: 0,
      total_paid: 0,
      total_due: 0,
    };

    // seller function
    async function orderAnalyTicSeller(status) {
      if (req.query.date_start && req.query.date_end) {
        and_query = [
          {
            createdAt: {
              $gte: new Date(req.query.date_start),
              $lte: new Date(req.query.date_end),
            },
          },
          {
            $or: [
              { "seller._id": req.authUser.business._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          { order_status: status },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      } else {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.date_end),
          //   },
          // },
          {
            $or: [
              { "seller._id": req.authUser.business._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          { order_status: status },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      }
    }
    async function orderAnalyTicSellerTotal() {
      if (req.query.date_start && req.query.date_end) {
        and_query = [
          {
            createdAt: {
              $gte: new Date(req.query.date_start),
              $lte: new Date(req.query.date_end),
            },
          },
          {
            $or: [
              { "seller._id": req.authUser.business._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_paid: { $sum: "$total_paid" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      } else {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.date_end),
          //   },
          // },
          {
            $or: [
              { "seller._id": req.authUser.business._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_paid: { $sum: "$total_paid" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      }
    }
    // Buyer function
    async function orderAnalyTicBuyer(status) {
      if (req.query.date_start && req.query.date_end) {
        and_query = [
          {
            createdAt: {
              $gte: new Date(req.query.date_start),
              $lte: new Date(req.query.date_end),
            },
          },
          {
            $or: [
              { "buyer._id": req.authUser.business._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          { order_status: status },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      } else {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.date_end),
          //   },
          // },
          {
            $or: [
              { "buyer._id": req.authUser.business._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          { order_status: status },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      }
    }
    async function orderAnalyTicBuyerTotal() {
      if (req.query.date_start && req.query.date_end) {
        and_query = [
          {
            createdAt: {
              $gte: new Date(req.query.date_start),
              $lte: new Date(req.query.date_end),
            },
          },
          {
            $or: [
              { "buyer._id": req.authUser.business._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_paid: { $sum: "$total_paid" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      } else {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.date_end),
          //   },
          // },
          {
            $or: [
              { "buyer._id": req.authUser.business._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_paid: { $sum: "$total_paid" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      }
    }
    if (req.authUser.business.business_group === "Seller") {
      const cancel = await orderAnalyTicSeller("Cancel");
      if (cancel.length !== 0) {
        orderAnalyTicObj.cancel = cancel[0].total_orders;
      } else {
        orderAnalyTicObj.cancel = 0;
      }
      const delivered = await orderAnalyTicSeller("Delivered");
      if (delivered.length !== 0) {
        orderAnalyTicObj.delivered = delivered[0].total_orders;
      } else {
        orderAnalyTicObj.delivered = 0;
      }
      const paid = await orderAnalyTicSeller("Paid");
      if (paid.length !== 0) {
        orderAnalyTicObj.paid = paid[0].total_orders;
      } else {
        orderAnalyTicObj.paid = 0;
      }
      const partially_delivered = await orderAnalyTicSeller(
        "Partially_Delivered"
      );
      if (partially_delivered.length !== 0) {
        orderAnalyTicObj.partially_delivered =
          partially_delivered[0].total_orders;
      } else {
        orderAnalyTicObj.partially_delivered = 0;
      }
      const partially_paid = await orderAnalyTicSeller("Partially_Paid");
      if (partially_paid.length !== 0) {
        orderAnalyTicObj.partially_paid = partially_paid[0].total_orders;
      } else {
        orderAnalyTicObj.partially_paid = 0;
      }

      const placed = await orderAnalyTicSeller("Placed");
      if (placed.length !== 0) {
        orderAnalyTicObj.placed = placed[0].total_orders;
      } else {
        orderAnalyTicObj.placed = 0;
      }
      const totalOrder = await orderAnalyTicSellerTotal();
      if (totalOrder.length !== 0) {
        orderAnalyTicObj.totalOrder = totalOrder[0].total_orders;
        orderAnalyTicObj.totalAmount = totalOrder[0].total_amount;
        orderAnalyTicObj.total_paid = totalOrder[0].total_paid;
        orderAnalyTicObj.total_due =
          totalOrder[0].total_amount - totalOrder[0].total_paid;
      } else {
        orderAnalyTicObj.totalOrder = 0;
        orderAnalyTicObj.totalAmount = 0;
        orderAnalyTicObj.total_paid = 0;
        orderAnalyTicObj.total_due = 0;
      }
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: orderAnalyTicObj,
      });
    } else {
      const cancel = await orderAnalyTicBuyer("Cancel");
      if (cancel.length !== 0) {
        orderAnalyTicObj.cancel = cancel[0].total_orders;
      } else {
        orderAnalyTicObj.cancel = 0;
      }
      const delivered = await orderAnalyTicBuyer("Delivered");
      if (delivered.length !== 0) {
        orderAnalyTicObj.delivered = delivered[0].total_orders;
      } else {
        orderAnalyTicObj.delivered = 0;
      }
      const paid = await orderAnalyTicBuyer("Paid");
      if (paid.length !== 0) {
        orderAnalyTicObj.paid = paid[0].total_orders;
      } else {
        orderAnalyTicObj.paid = 0;
      }
      const partially_delivered = await orderAnalyTicBuyer(
        "Partially_Delivered"
      );
      if (partially_delivered.length !== 0) {
        orderAnalyTicObj.partially_delivered =
          partially_delivered[0].total_orders;
      } else {
        orderAnalyTicObj.partially_delivered = 0;
      }
      const partially_paid = await orderAnalyTicBuyer("Partially_Paid");
      if (partially_paid.length !== 0) {
        orderAnalyTicObj.partially_paid = partially_paid[0].total_orders;
      } else {
        orderAnalyTicObj.partially_paid = 0;
      }

      const placed = await orderAnalyTicBuyer("Placed");
      if (placed.length !== 0) {
        orderAnalyTicObj.placed = placed[0].total_orders;
      } else {
        orderAnalyTicObj.placed = 0;
      }
      const totalOrder = await orderAnalyTicBuyerTotal();
      if (totalOrder.length !== 0) {
        orderAnalyTicObj.totalOrder = totalOrder[0].total_orders;
        orderAnalyTicObj.totalAmount = totalOrder[0].total_amount;
        orderAnalyTicObj.total_paid = totalOrder[0].total_paid;
        orderAnalyTicObj.total_due =
          totalOrder[0].total_amount - totalOrder[0].total_paid;
      } else {
        orderAnalyTicObj.totalOrder = 0;
        orderAnalyTicObj.totalAmount = 0;
        orderAnalyTicObj.total_paid = 0;
        orderAnalyTicObj.total_due = 0;
      }
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: orderAnalyTicObj,
      });
    }
  },

  getCollectionById: async function (req, res, next) {
    try {
      const response = await OrderCollection.findById(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },

  getCollection: async function (req, res, next) {
    // order collection status updatedOrderItems
    try {
      const countResponse = await OrderCollection.countDocuments();
      console.log(req.query.search);
      console.log(req.query.limit);
      // const respond = await OrderCollection.find({ country: req.params.country })
      const mobileRes = await OrderCollection.find({
        collectedBy: { $regex: ".*" + req.query.search + ".*" },
      });
      console.log("response search", mobileRes);
      const response = await OrderCollection.find()
        .sort({ createdAt: -1 })
        .limit(parseInt(req.query.limit))
        .skip(parseInt((req.query.page - 1) * req.query.limit));

      console.log(countResponse);
      // console.log(res);
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: req.query.search === "" ? response : mobileRes,
        meta: {
          count: countResponse,
          page: Number(req.query.page),
          limit: Number(req.query.limit),
          search: mobileRes,
          // search: mobileRes,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  getLastMonthOrderData: async function (req, res) {
    try {
      const respond = await Order.find({
        createdAt: {
          $gte: new Date(req.query.date_start),
          $lte: new Date(req.query.date_end),
        },
        "created_by_user.country": req.query.country,
      });
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: respond,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error,
      });
    }
  },
  getOrderStatusAnalyticCustom: async function (req, res, next) {
    let and_query = [];
    let orderAnalyTicObj = {
      totalOrder: 0,
      totalAmount: 0,
      totalAmountWithOutEx: 0,
      origin: 0,
      paid: 0,
      delivered: 0,
      partially_paid: 0,
      partially_delivered: 0,
      cancel: 0,
      placed: 0,
      total_paid: 0,
      total_due: 0,
    };

    // Buyer function
    async function orderAnalyTicBuyer(status) {
      if (req.query.date_start && req.query.date_end) {
        and_query = [
          {
            createdAt: {
              $gte: new Date(req.query.date_start),
              $lte: new Date(req.query.date_end),
            },
          },
          {
            $or: [
              { "created_by_user.country": req.query.country },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          { order_status: status },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      } else {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.date_end),
          //   },
          // },
          {
            $or: [
              { "created_by_user.country": req.query.country },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          { order_status: status },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      }
    }
    async function orderAnalyTicBuyerTotal() {
      // console.log(req.query);
      if (req.query.date_start && req.query.date_end) {
        and_query = [
          {
            createdAt: {
              $gte: new Date(req.query.date_start),
              $lte: new Date(req.query.date_end),
            },
          },
          {
            $or: [
              { "created_by_user.country": req.query.country },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          { order_status: { $ne: "Cancel" } },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_paid: { $sum: "$total_paid" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      } else {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.date_end),
          //   },
          // },
          {
            $or: [
              { "created_by_user.country": req.query.country },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          { order_status: { $ne: "Cancel" } },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_paid: { $sum: "$total_paid" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      }
    }
    // new function include with cancel query results
    async function orderAnalyTicBuyerTotalWithCancel() {
      // console.log(req.query);
      if (req.query.date_start && req.query.date_end) {
        and_query = [
          {
            createdAt: {
              $gte: new Date(req.query.date_start),
              $lte: new Date(req.query.date_end),
            },
          },
          {
            $or: [
              { "created_by_user.country": req.query.country },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          // { order_status: { $ne: "Cancel" } },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_paid: { $sum: "$total_paid" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      } else {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.date_end),
          //   },
          // },
          {
            $or: [
              { "created_by_user.country": req.query.country },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          // { order_status: { $ne: "Cancel" } },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_paid: { $sum: "$total_paid" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      }
    }
    // order origin count function
    async function orderAnalyTicOrderCount() {
      // console.log(req.query);
      if (req.query.date_start && req.query.date_end) {
        and_query = [
          {
            createdAt: {
              $gte: new Date(req.query.date_start),
              $lte: new Date(req.query.date_end),
            },
          },
          {
            $or: [
              { "created_by_user.country": req.query.country },
              { order_origin: "EkkBaz" },
            ],
          },
          // { order_status: { $ne: "Cancel" } },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              // total_amount: { $sum: "$total" },
              // total_paid: { $sum: "$total_paid" },
              total_origin: { $sum: 1 },
              // currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      } else {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.date_end),
          //   },
          // },
          {
            $or: [
              { "created_by_user.country": req.query.country },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          // { order_status: { $ne: "Cancel" } },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_paid: { $sum: "$total_paid" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      }
    }
    const cancel = await orderAnalyTicBuyer("Cancel");
    if (cancel.length !== 0) {
      orderAnalyTicObj.cancel = cancel[0].total_orders;
    } else {
      orderAnalyTicObj.cancel = 0;
    }
    const delivered = await orderAnalyTicBuyer("Delivered");
    if (delivered.length !== 0) {
      orderAnalyTicObj.delivered = delivered[0].total_orders;
    } else {
      orderAnalyTicObj.delivered = 0;
    }
    const paid = await orderAnalyTicBuyer("Paid");
    if (paid.length !== 0) {
      orderAnalyTicObj.paid = paid[0].total_orders;
    } else {
      orderAnalyTicObj.paid = 0;
    }
    const partially_delivered = await orderAnalyTicBuyer("Partially_Delivered");
    if (partially_delivered.length !== 0) {
      orderAnalyTicObj.partially_delivered =
        partially_delivered[0].total_orders;
    } else {
      orderAnalyTicObj.partially_delivered = 0;
    }
    const partially_paid = await orderAnalyTicBuyer("Partially_Paid");
    if (partially_paid.length !== 0) {
      orderAnalyTicObj.partially_paid = partially_paid[0].total_orders;
    } else {
      orderAnalyTicObj.partially_paid = 0;
    }

    const placed = await orderAnalyTicBuyer("Placed");
    if (placed.length !== 0) {
      orderAnalyTicObj.placed = placed[0].total_orders;
    } else {
      orderAnalyTicObj.placed = 0;
    }
    const totalOrder = await orderAnalyTicBuyerTotal();
    if (totalOrder.length !== 0) {
      orderAnalyTicObj.totalOrder = totalOrder[0].total_orders;
      orderAnalyTicObj.totalAmount = totalOrder[0].total_amount;
      orderAnalyTicObj.total_paid = totalOrder[0].total_paid;
      orderAnalyTicObj.total_due =
        totalOrder[0].total_amount - totalOrder[0].total_paid;
    } else {
      orderAnalyTicObj.totalOrder = 0;
      orderAnalyTicObj.totalAmount = 0;
      orderAnalyTicObj.total_paid = 0;
      orderAnalyTicObj.total_due = 0;
    }
    // cancel order list summery orders
    const totalOrderCancel = await orderAnalyTicBuyerTotalWithCancel();
    if (totalOrderCancel.length !== 0) {
      orderAnalyTicObj.totalAmountWithOutEx = totalOrderCancel[0].total_amount;
    }
    // origin count
    const totalOrigin = await orderAnalyTicOrderCount();
    if (totalOrigin.length !== 0) {
      console.log("totalOrigin");
      console.log(totalOrigin);
      orderAnalyTicObj.origin = totalOrigin[0].total_origin;
    }
    return res.status(200).json({
      success: true,
      message: "Order fetched successfully m!",
      data: orderAnalyTicObj,
    });
  },
  getOrderStatusByDayDetailsCustom12: async function (req, res, next) {
    console.log("---------- order data mos v5---------");
    console.log(req.authUser);
    let orderAnalyTicObj = {
      totalOrder: 0,
      paid: 0,
      delivered: 0,
      partially_paid: 0,
      partially_delivered: 0,
      cancel: 0,
      placed: 0,
    };
    let and_query = [];
    async function orderAnalyTic(status) {
      if (req.query.date_start && req.query.date_end) {
        and_query = [
          // {
          //   createdAt: {
          //     $gte: new Date(req.query.date_start),
          //     $lte: new Date(req.query.date_end),
          //   },
          // },
          {
            $or: [
              { "buyer._id": req.authUser.business._id },
              // { "buyer.parent._id": req.authUser.business._id },
            ],
          },
          { order_status: status },
        ];
        let queryResult = await Order.aggregate([
          {
            $match: {
              $and: and_query,
            },
          },
          {
            $group: {
              _id: null,
              total_amount: { $sum: "$total" },
              total_orders: { $sum: 1 },
              currency: { $first: "$currency" },
            },
          },
        ]);
        return queryResult;
      }
    }

    try {
      // check business group

      if (req.authUser.business.business_group === "Seller") {
        // check Admin or Seller
        if (req.query.date_start && req.query.date_end) {
          and_query = [
            {
              createdAt: {
                $gte: new Date(req.query.date_start),
                $lte: new Date(req.query.date_end),
              },
            },
            {
              $or: [
                { "seller._id": req.authUser.business._id },
                // { "buyer.parent._id": req.authUser.business._id },
              ],
            },
            // { order_status: { $ne: "Cancel" } },
          ];

          let queryResult = await Order.aggregate([
            {
              $match: {
                $and: and_query,
              },
            },
            {
              $group: {
                _id: null,
                total_amount: { $sum: "$total" },
                total_orders: { $sum: 1 },
                currency: { $first: "$currency" },
              },
            },
          ]);

          return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: queryResult,
          });
        } else if (req.query.order_status) {
          and_query = [
            {
              $or: [
                { "seller._id": req.authUser.business._id },
                // { "buyer.parent._id": req.authUser.business._id },
              ],
            },
            { order_status: req.query.order_status },
            // { order_status: { $ne: "Cancel" } },
          ];

          let queryResult = await Order.aggregate([
            {
              $match: {
                $and: and_query,
              },
            },
            {
              $group: {
                _id: null,
                total_amount: { $sum: "$total" },
                total_orders: { $sum: 1 },
                currency: { $first: "$currency" },
              },
            },
          ]);
          return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: queryResult,
          });
        } else {
          and_query = [
            {
              $or: [
                { "buyer._id": req.authUser.business._id },
                // { "buyer.parent._id": req.authUser.business._id },
              ],
            },
            // { order_status: req.query.order_status },
            // { order_status: { $ne: "Cancel" } },
          ];

          let queryResult = await Order.aggregate([
            {
              $match: {
                $and: and_query,
              },
            },
            {
              $group: {
                _id: null,
                total_amount: { $sum: "$total" },
                total_orders: { $sum: 1 },
                currency: { $first: "$currency" },
              },
            },
          ]);
          return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: queryResult,
          });
        }
      } else {
        if (req.query.date_start && req.query.date_end) {
          and_query = [
            {
              createdAt: {
                $gte: new Date(req.query.date_start),
                $lte: new Date(req.query.date_end),
              },
            },
            {
              $or: [
                { "buyer._id": req.authUser.business._id },
                // { "buyer.parent._id": req.authUser.business._id },
              ],
            },
            // { order_status: { $ne: "Cancel" } },
          ];

          let queryResult = await Order.aggregate([
            {
              $match: {
                $and: and_query,
              },
            },
            {
              $group: {
                _id: null,
                total_amount: { $sum: "$total" },
                total_orders: { $sum: 1 },
                currency: { $first: "$currency" },
              },
            },
          ]);

          return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: queryResult,
          });
        } else if (req.query.order_status) {
          and_query = [
            {
              $or: [
                { "buyer._id": req.authUser.business._id },
                // { "buyer.parent._id": req.authUser.business._id },
              ],
            },
            { order_status: req.query.order_status },
            // { order_status: { $ne: "Cancel" } },
          ];

          let queryResult = await Order.aggregate([
            {
              $match: {
                $and: and_query,
              },
            },
            {
              $group: {
                _id: null,
                total_amount: { $sum: "$total" },
                total_orders: { $sum: 1 },
                currency: { $first: "$currency" },
              },
            },
          ]);
          console.log("---------- queryResult---------");
          logger.info(queryResult);
          return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: queryResult,
          });
        } else {
          // const paid = await orderAnalyTic("Paid");
          let result_set = await Order.find(
            {
              createdAt: {
                $gte: new Date(req.query.date_start),
                $lte: new Date(req.query.date_end),
              },
              "buyer._id": req.authUser.business._id,
              // "buyer.parent._id": req.authUser.business._id,
            }
            // {
            //   $group: {
            //     _id: null,
            //     total_amount: { $sum: "$total" },
            //     item_quantity: { $sum: "$item_quantity" },
            //     total_orders: { $sum: 1 },
            //     currency: { $first: "$currency" },
            //   },
            // },
          );
          and_query = [
            {
              $or: [
                { "buyer._id": req.authUser.business._id },
                // { "buyer.parent._id": req.authUser.business._id },
              ],
            },
            // { order_status: req.query.order_status },
            // { order_status: { $ne: "Cancel" } },
          ];

          let queryResult = await Order.aggregate([
            {
              $match: {
                $and: and_query,
              },
            },
            {
              $group: {
                _id: null,
                total_amount: { $sum: "$total" },
                total_orders: { $sum: 1 },
                currency: { $first: "$currency" },
              },
            },
          ]);
          return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: queryResult,
          });
        }
      }
    } catch (error) {
      logger.error("Error in custom.getOrderTotalByDay: try/catch=>", error);
      return res.status(501).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  },
};
