import { Paper, Typography } from '@mui/material';


export default function ({ odpowiedz, znacznik, tresc, answer, onClick }: { odpowiedz: string, tresc: string, znacznik:string, answer: string, onClick: (c: string) => any }) {
    return <Paper
        onClick={() => onClick(odpowiedz)}
        elevation={odpowiedz === answer ? 3 : 0}
        sx={{
            padding: 2,
            cursor: "pointer",
            backgroundColor:
                odpowiedz && odpowiedz === answer
                    ? "#c8e6c9"
                    : znacznik == odpowiedz
                    ? "#ffcdd2"
                    : "white"
        }}
    >
        <Typography variant="body1">{tresc}</Typography>
    </Paper>
}