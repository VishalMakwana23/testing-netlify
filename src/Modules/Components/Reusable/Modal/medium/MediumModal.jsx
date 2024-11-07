import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import defaultUser from "../../../../../assets/icons/org_user.png";
import close_icon from "../../../../../assets/icons//closeicon.svg"
import dndimage_icon from "../../../../../assets/icons/dndImage.svg";
import back_icon from "../../../../../assets/icons/Back.svg";
import blog_icon from "../../../../../assets/icons/blogicon.svg";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import "./index.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { PatchCallApi, PostCallApi } from "../../../../../Action/Action";
import { useSelector } from "react-redux";
import Carousel from 'better-react-carousel'

const renderLoader = () => <p></p>;

export default function MediumModal(props) {
    const { mediumOpen, setMediumOpen, blogOpen, setBlogOpen, blogVal, isEdit, post, onBlogUpdate } = props;

    const [selectPop, setSelectPop] = useState("");
    const [largeOpen, setLargeOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [derror, setDerror] = useState("");
    const [images, setImages] = useState([]);
    const [blogData, setBlogData] = useState([])
    const [briefData, setBriefData] = useState([])
    const [briefsImg, setBrifsImg] = useState([])
    const [rerender, setRerender] = useState(0)

    const token = useSelector((state) => state.login.LoginDetails.data.token);
    const LogDetails = useSelector((state) => state.login?.LoginDetails?.data)

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
    }

    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        reset,
        setError,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();

    const handleClose = () => {
        setImages([])
        setMediumOpen(false);
        setLargeOpen(false);
        setBlogOpen(false);
        setSelectPop("");
        reset()
    };

    React.useEffect(() => {
        if (isEdit && post) {
            setValue("title", post.title);
            setValue("description", post.description);
            setValue("hashtags", post.hashtags.join(", "));
            setImages(post.mediaURL)
            setRerender(rerender + 1)
        }

         // eslint-disable-next-line
    }, [isEdit, post, blogOpen])

    const handleImg = (e) => {
        if (e.target?.files?.length > 5) {
            setDerror({ img: "Maximum five upload" });
        } else if (e.target?.files?.length <= 5) {
            let oldImages = Array.from(e.target?.files)
            setDerror("");
            const fileName = [...images];

            oldImages.map((x) => {
                fileName[fileName.length] = x
                setImages(fileName)
                return 0;
            });
        }
    };

    const removeImg = (_, ind) => {
        let delImg = images?.filter((_, index) => {
            return index !== ind
        })
        setImages(delImg)
    }

    const handleSelectNext = (val) => {
        setMediumOpen(false);
        setLargeOpen(true);
        setSelectPop(val);
    };

    const onSubmit = (data) => {
        if (!getValues("title") && !getValues("description") && images.length === 0) {
           setError('title', {message: 'Title or Description or Media any one is required to post blog.'})
           return;
        }

        let saData = {
            ...data,
        }
        setBlogData(saData)
        handleSelectNext("BlogReview")
    }
    const handleBlogEditPublish = async () => {
        setOpen(true)

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
        };
        let seData = {
            url: `v1/blog/${post._id}`,
            headers: headers,
            body: {
                "title": blogData?.title,
                "description":  blogData?.description,
                "hashtags": blogData?.hashtags?.split(", ")
            }
        };
        const resp = await PatchCallApi(seData);
        setOpen(false)
        if (resp?.status === 200) {
            setBlogData([])
            handleClose()
            reset()
            setSelectPop("")
            onBlogUpdate(resp.data.data)
        }
    }

    const handleBlogPublish = async () => {
        if (isEdit) {
            handleBlogEditPublish();
            return;
        }
        setOpen(true)
        let blog = new FormData()

        images?.length > 1 ? images?.map((im) => blog?.append('media', im)) : blog?.append('media', images[0])
        const data = {}
        if (blogData?.title) {
            data.title = blogData?.title
        }
        if (blogData?.description) {
            data.description = blogData?.description
        }
        if (blogData?.hashtags) {
            data.hashtags = blogData?.hashtags
        }
        blog?.append('data', JSON.stringify(data))

        let apiData = {
            url: `/v1/blog/add`,
            body: blog,
            headers: headers,
        }

        let resp = await PostCallApi(apiData)
        setOpen(false)
        if (resp?.status === 201) {
            setBlogData([])
            handleClose()
            reset()
            setSelectPop("")
        }
    }

    const handleBriefsImg = (e) => {
        let files = e.target?.files
        if (files?.length > 0) {
            setBrifsImg(files)
            handleSelectNext('NewgetBrief')
        }
    }

    const BackPage = () => {
        setMediumOpen(true)
        setLargeOpen(false);
    }

    const onSubmitBrief = (d) => {
        let sdata = {
            ...d,
        }
        setBriefData(sdata)
        handleSelectNext("Review")
    }

    const briefPublish = async () => {
        setOpen(true)

        let brief = new FormData()

        briefsImg?.length > 1 ? briefsImg?.map((im) => brief?.append('media', im)) : brief?.append('media', briefsImg[0])
        const data = {}
        if (briefData?.description) {
            data.description = briefData?.description
        }
        if (briefData?.hashtags) {
            data.hashtags = briefData?.hashtags
        }
        brief?.append('data', JSON.stringify(data))

        let apiData = {
            url: `/v1/brief/add`,
            body: brief,
            headers: headers,
        }

        let re = await PostCallApi(apiData)
        setOpen(false)
        if (re?.status === 201) {
            setBlogData([])
            handleClose()
            reset()
            setSelectPop("")
        }
    }

    const onHashChange = (event) => {
        if (getValues("hashtags").includes("#") || event.target.value.includes("#")) {
            setValue("hashtags", event.target.value)
        } else {
            setValue("hashtags", "#" + event.target.value)
        }
    }

    return (
        <React.Fragment>
            <Backdrop
                open={open}
                sx={{ color: "#fff", zIndex: (theme) => 1500 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <React.Suspense fallback={renderLoader()}>
                {mediumOpen && (
                    <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={mediumOpen}
                        onClose={handleClose}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Sheet
                            variant="outlined"
                            sx={{
                                maxWidth: 380,
                                maxHeight: 450,
                                borderRadius: "md",
                                p: 3,
                                boxShadow: "lg",
                            }}
                        >
                            <ModalClose variant="plain" />
                            <div className="row">
                                <div style={{ color: "black" }}>
                                    <div className="block_badge mb-3">
                                        <h4>Create new Brief</h4>
                                    </div>
                                    <div className="upload_images">
                                        <IconButton component="label">
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={handleBriefsImg}
                                                hidden
                                            />
                                            <img src={dndimage_icon} alt="" />
                                            <span>Drag Videos here!</span>
                                        </IconButton>
                                    </div>
                                    <div className="select_computer">
                                        <IconButton component="label">
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={handleBriefsImg}
                                                hidden
                                            />
                                            <span>
                                                Select From Computer
                                            </span>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </Sheet>
                    </Modal>
                )}
                {selectPop === "NewgetBrief"
                    ? largeOpen && (
                        <Modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-desc"
                            open={largeOpen}
                            onClose={handleClose}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Sheet
                                variant="outlined"
                                sx={{
                                    maxWidth: 380,
                                    maxHeight: "auto",
                                    borderRadius: "md",
                                    p: 3,
                                    boxShadow: "lg",
                                }}
                            >
                                <ModalClose variant="plain" />
                                <div className="row">
                                    <div className="new_brief">
                                        <img src={back_icon} alt="" onClick={BackPage} />
                                        <p className="ms-4">New Brief</p>
                                    </div>
                                    <div className="getbrief_image">
                                        {briefsImg[0].type.startsWith('video') ? (
                                            <video src={URL.createObjectURL(briefsImg[0])} controls width="400" />
                                        ) : (
                                            <p>Unsupported file type</p>
                                        )}
                                    </div>
                                    <div className="brief_select mb-3">
                                        <IconButton component="label">
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={handleBriefsImg}
                                                hidden
                                            />
                                            <span>
                                                Select
                                            </span>
                                        </IconButton>
                                    </div>
                                    <div className="brief_next">
                                        <button onClick={() => handleSelectNext("Next")}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </Sheet>
                        </Modal>
                    )
                    : selectPop === "Next"
                        ? largeOpen && (
                            <Modal
                                aria-labelledby="modal-title"
                                aria-describedby="modal-desc"
                                open={largeOpen}
                                onClose={handleClose}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Sheet
                                    variant="outlined"
                                    sx={{
                                        maxWidth: 1000,
                                        borderRadius: "md",
                                        p: 3,
                                        boxShadow: "lg",
                                    }}
                                >
                                    <ModalClose variant="plain" />
                                    <>
                                        <div className="row">
                                            <div className="review_name">
                                                <img src={back_icon} alt="" onClick={() => handleSelectNext("NewgetBrief")} />
                                                <h4 className="ms-4">New Brief</h4>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="newbrief_upload_image">
                                                        {briefsImg[0].type.startsWith('video') ? (
                                                            <video src={URL.createObjectURL(briefsImg[0])} controls width="400" />
                                                        ) : (
                                                            <p>Unsupported file type</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="user_image">
                                                            <img src={LogDetails?.profilePic ? LogDetails?.profilePic : defaultUser} alt="" />
                                                            <span className="ms-3">{LogDetails?.userName}</span>
                                                        </div>
                                                    </div>
                                                    <form onSubmit={handleSubmit(onSubmitBrief)}>
                                                        <div className="para border_show">
                                                            <div className="col-md-12 mt-3">
                                                                <div className="form-group">
                                                                    <textarea
                                                                        className="form-area"
                                                                        placeholder={t("Enter Description...")}
                                                                        {...register("description", {
                                                                           // required: "This field is required",
                                                                        })}
                                                                        rows="7"
                                                                    ></textarea>
                                                                    {errors.description && (
                                                                        <span role="alert" className="error_text">
                                                                            {errors.description.message}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="hashtags">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder={t("Enter Hashtags...")}
                                                                            {...register("hashtags", {
                                                                                // required: "This field is required",
                                                                            })}
                                                                            onChange={onHashChange}
                                                                        />
                                                                        {/* {errors.hashtags && (
                                                                            <span role="alert" className="error_text">
                                                                                {errors.hashtags.message}
                                                                            </span>
                                                                        )} */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="review_blog d-flex justify-content-between">
                                                            <button type="submit">Review</button>
                                                        </div> */}
                                                        <div className="review d-flex justify-content-between">
                                                            <button type="submit">
                                                                <span className="r_btn">
                                                                    Review
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                </Sheet>
                            </Modal>
                        )
                        :
                        selectPop === "Review"
                            ? largeOpen && (
                                <Modal
                                    aria-labelledby="modal-title"
                                    aria-describedby="modal-desc"
                                    open={largeOpen}
                                    onClose={handleClose}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Sheet
                                        variant="outlined"
                                        sx={{
                                            maxWidth: 410,
                                            maxHeight: "auto",
                                            borderRadius: "md",
                                            p: 3,
                                            boxShadow: "lg",
                                        }}
                                    >
                                        <ModalClose variant="plain" />
                                        <div className="row">
                                            <div className="new_brief mb-3">
                                                <img src={back_icon} alt="" onClick={() => handleSelectNext("Next")} />
                                                <h4 className="ms-4 text-black">Review</h4>
                                            </div>
                                            <div className="publish_page_review">
                                                {briefsImg[0].type.startsWith('image') ? (
                                                    <img src={URL.createObjectURL(briefsImg[0])} alt="" />
                                                ) : briefsImg[0].type.startsWith('video') ? (
                                                    <video src={URL.createObjectURL(briefsImg[0])} controls width="400" />
                                                ) : (
                                                    <p>Unsupported file type</p>
                                                )}
                                            </div>
                                            <div className="para">
                                                <p className="description">
                                                    {briefData?.description}
                                                </p>
                                                <div className="hashtags">
                                                    <span>
                                                        {briefData?.hashtags}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="main_btn">
                                                <div className="review">
                                                    <button onClick={briefPublish}>
                                                        <span className="p_btn">
                                                            Publish
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Sheet>
                                </Modal>
                            ) :
                            selectPop === "BlogReview"
                                ? largeOpen && (
                                    <Modal
                                        aria-labelledby="modal-title"
                                        aria-describedby="modal-desc"
                                        open={largeOpen}
                                        onClose={handleClose}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Sheet
                                            variant="outlined"
                                            sx={{
                                                maxWidth: 1000,
                                                borderRadius: "md",
                                                p: 3,
                                                boxShadow: "lg",
                                            }}
                                        >
                                            <ModalClose variant="plain" />
                                            <div className="row">
                                                <div className="review_name">
                                                    <img src={back_icon} alt="" onClick={() => handleSelectNext('Blog')} />
                                                    <h4 className="ms-4">Review</h4>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="outer_images">
                                                            {images?.length > 1 ?
                                                                <Carousel cols={1} rows={1} gap={10} loop>
                                                                    {images?.map((im, i) => {
                                                                        return (
                                                                            <Carousel.Item key={i}>
                                                                                <div className="blog_multi_img">
                                                                                    <img src={typeof im === 'string' && im.includes("https://") ? im : URL.createObjectURL(im)} alt="" />
                                                                                </div>
                                                                            </Carousel.Item>
                                                                        )
                                                                    })}
                                                                </Carousel>
                                                                :
                                                                images?.length > 0
                                                                    ?
                                                                    images?.map((im, i) => {
                                                                        return (
                                                                            <div className="blog_multi_img" key={i}>
                                                                                <img src={typeof im === 'string' && im.includes("https://") ? im : URL.createObjectURL(im)} alt="" />
                                                                            </div>
                                                                        )
                                                                    })
                                                                    :
                                                                    <div className="blog_multi_img d-flex justify-content-center align-items-center">
                                                                        <h5 className="justify-content-center">No Media Available</h5>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="blogs_title">
                                                                <span>{blogData?.title}</span>
                                                            </div>
                                                        </div>
                                                        <div className="para">
                                                            <p className="description">
                                                                {blogData?.description}
                                                            </p>
                                                            <div className="blog_hashtags">
                                                                <span>{blogData?.hashtags}</span>
                                                            </div>
                                                        </div>
                                                        <div className="publish_blog_btn d-flex justify-content-between">
                                                            <button onClick={handleBlogPublish}>
                                                                Publish
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Sheet>
                                    </Modal>
                                )
                                : blogVal === "Blog"
                                    ? blogOpen && (
                                        <Modal
                                            aria-labelledby="modal-title"
                                            aria-describedby="modal-desc"
                                            open={blogOpen}
                                            onClose={handleClose}
                                            key={rerender}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Sheet
                                                variant="outlined"
                                                sx={{
                                                    maxWidth: 1000,
                                                    borderRadius: "md",
                                                    p: 3,
                                                    boxShadow: "lg",
                                                }}
                                            >
                                                <ModalClose variant="plain" />
                                                <>
                                                    <div className="row">
                                                        <div className="review_name">
                                                            <img src={back_icon} alt="" />
                                                            <h4 className="ms-4">{isEdit ? "Edit Blog" : "New Blog"}</h4>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                                    <div className="col-md-12">
                                                                        <div className="form-group">
                                                                            <label>{t("Add Title")}</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder={t("Enter Title")}
                                                                                {...register("title", {
                                                                                   // required: "This field is required",
                                                                                })}
                                                                            />
                                                                            {errors.title && (
                                                                                <span role="alert" className="error_text">
                                                                                    {errors.title.message}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <div className="form-group">
                                                                            <label>{t("Description")}</label>
                                                                            <textarea
                                                                                className="form-area"
                                                                                placeholder={t("Enter Description...")}
                                                                                {...register("description", {
                                                                                    // required: "This field is required",
                                                                                })}
                                                                                rows="7"
                                                                            ></textarea>
                                                                            {errors.description && (
                                                                                <span role="alert" className="error_text">
                                                                                    {errors.description.message}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder={t("Enter Hashtags...")}
                                                                                {...register("hashtags", {
                                                                                    // required: "This field is required",
                                                                                })}
                                                                                onChange={onHashChange}
                                                                            />
                                                                            {/* {errors.hashtags && (
                                                                            <span role="alert" className="error_text">
                                                                                {errors.hashtags.message}
                                                                            </span>
                                                                        )} */}
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <div className="form-group">
                                                                            <div className="img_video">
                                                                                <IconButton component="label">
                                                                                    <input
                                                                                        type="file"
                                                                                        accept="image/*"
                                                                                        className="form-control"
                                                                                        onChange={handleImg}
                                                                                        multiple
                                                                                        max={5}
                                                                                        hidden
                                                                                    />
                                                                                    <img src={blog_icon} alt="" />
                                                                                    <span>Upload Images</span>
                                                                                </IconButton>
                                                                            </div>
                                                                            {derror?.img && (
                                                                                <span role="alert" className="error_text">
                                                                                    {derror?.img}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <div className="show_img">
                                                                            {images &&
                                                                                images?.map((im, i) => {
                                                                                    return (
                                                                                        <div className="multi_images" key={i}>
                                                                                            <img
                                                                                                src={typeof im === 'string' && im.includes("https://") ? im : URL.createObjectURL(im)}
                                                                                                alt=""
                                                                                            />
                                                                                            {/* {im.type.startsWith('image') ? (
                                                                                                <img src={URL.createObjectURL(im)} alt="" />
                                                                                            ) : im.type.startsWith('video') ? (
                                                                                                <video src={URL.createObjectURL(im)} controls width="400" />
                                                                                            ) : (
                                                                                                <p>Unsupported file type</p>
                                                                                            )} */}
                                                                                            {typeof im === 'string' && im.includes("https://")  ?  null : <button type="button" onClick={() => removeImg(im, i)}>
                                                                                                <img src={close_icon} alt="" />
                                                                                            </button>}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                        </div>
                                                                    </div>
                                                                    <div className="review_blog d-flex justify-content-between">
                                                                        <button type="submit">Review</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            </Sheet>
                                        </Modal>
                                    )
                                    : ""}
                {/* <SmallModal briefBlog={backOpen} /> */}
            </React.Suspense>
        </React.Fragment>
    );
}
