import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVotes} from "../../../../redux/actions/index";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import style from './rating.module.css';

export default function RatingB({idCourse, setRefresh, refresh}) {

  const dispatch = useDispatch();

  const isLogged = useSelector(store => store.isLogged)

  const [value, setValue] = useState(0);
  const [ratingErro, setRatingError] = useState({});

  const setRating = (newValue) => {
    if(isLogged) {
      dispatch(addVotes({idCourse, votes: newValue}))
      setRatingError({})
      refresh? setRefresh(false) : setRefresh(true)
    } else {
      setRatingError({err: "No estas logeado"})
    }

  }

  return (
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setRating(newValue);
          }}
        />
        {ratingErro.err && <label className={style.err}>{ratingErro.err}</label>}
      </Box>
  );


}
