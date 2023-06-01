import './App.css';
import { useState } from 'react';
import { Box, Button, Card, CardContent, Checkbox, Paper, Typography } from '@mui/material';
import { questions } from './egzamininformatyk-atos-default-rtdb-inf02-o-export';

interface Question {
  "a": string,
  "q": {
    "header": string,
    "id": string,
    "loadA": string,
    "obrazek"?: string,
    "odpA": string,
    "odpB": string,
    "odpC": string,
    "odpD": string,
    "ord": string,
    "script": string,
    "tresc": string
  }
}

let przerobione: any = []
let pytania: any = []

let iloscPoprawnych = 0;
let iloscUdzielonych = 0;

    if(localStorage.getItem('iloscPoprawnych')&&localStorage.getItem('iloscUdzielonych')){
      let poprawne = JSON.parse(localStorage.getItem('iloscPoprawnych') ?? '') ?? 0
      let udzielone = JSON.parse(localStorage.getItem('iloscUdzielonych') ?? '') ?? 0

      iloscPoprawnych = poprawne
      iloscUdzielonych = udzielone
    }

    if (localStorage.getItem('przerobione')){
    const storedData = JSON.parse(localStorage.getItem('przerobione') ?? '');
    console.log(storedData)
    przerobione = storedData;
    }
console.log(przerobione)

export default function App() {

  function loadRandomQuestion() {
    let randomIndex = 0;
    if (przerobione.length > 0) {
      pytania = questions.filter((pytanie) => {
        return !przerobione.includes(+pytanie.q.id - 1)
      })
      if(!pytania){return 0}
      console.log(pytania)
      localStorage.setItem('przerobione', JSON.stringify(przerobione));

      randomIndex = Math.floor(Math.random() * pytania.length);
    }
    else {
      randomIndex = Math.floor(Math.random() * questions.length);
      return questions[randomIndex]
    }
    return pytania[randomIndex];
  };

  const [currentQuestion, setCurrentQuestion] = useState<Question>(loadRandomQuestion() as Question);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [answered, setAnswered] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleOptionClick = (option: any) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);
    }
  };

  const handleNextClick = () => {
    iloscUdzielonych++;
    localStorage.setItem('iloscUdzielonych', JSON.stringify(iloscUdzielonych));
    if (selectedOption === currentQuestion.a && !flag) {
      przerobione.push(+currentQuestion.q.id - 1)
      iloscPoprawnych++;
      localStorage.setItem('iloscPoprawnych', JSON.stringify(iloscPoprawnych));

      //console.log(przerobione)
    }
    setFlag(false)
    setAnswered(false);
    setSelectedOption('');
    setCurrentQuestion(loadRandomQuestion())
  };

  return (
    <Box sx={{
      p: 2,
      backgroundColor: '#494949'
    }}>
      {przerobione.length === questions.length ? ( <>
        <h1 style={{ color: 'white' }}>Congratulations ! Przerobiłeś wszystko, jest ogień.</h1>
        <Button sx={{p: 2, fontSize: 25, border: 'solid 5px black'}} onClick={()=>{
              localStorage.setItem('przerobione',JSON.stringify([]))
              iloscUdzielonych=0;
              localStorage.setItem('iloscUdzielonych', JSON.stringify(iloscUdzielonych));
              iloscPoprawnych=0;
              localStorage.setItem('iloscPoprawnych', JSON.stringify(iloscPoprawnych));
              window.location.reload();
            }}>
            RESETUJ PROGRES I ROZPOCZNIJ OD NOWA
          </Button>
        <h1><a id='donation_link' style={{ color: 'white' }} target='_blank' href='https://paypal.me/wojtaz31?country.x=PL&locale.x=pl_PL'>Link do donacji</a></h1>
      </>) :
        <><Card sx={{ mb: 2,
          backgroundColor: '#181818',
          color: 'white' }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2, }}>
              {currentQuestion.q.header}
            </Typography>
            Oflaguj pytanie:
            <Checkbox
              checked={flag}
              onChange={() => setFlag(!flag)}
              sx={{
                mb: 2,
                margin: 1,
                color: 'white'
              }}
            />
            <Button sx={{p: 2}} onClick={()=>{
              localStorage.setItem('przerobione',JSON.stringify([]))
              iloscUdzielonych=0;
              localStorage.setItem('iloscUdzielonych', JSON.stringify(iloscUdzielonych));
              iloscPoprawnych=0;
              localStorage.setItem('iloscPoprawnych', JSON.stringify(iloscPoprawnych));
              window.location.reload();
            }}>
            HARD RESET
          </Button>
          <Button sx={{m: 2}} variant="contained" onClick={()=>{
              iloscUdzielonych=0;
              localStorage.setItem('iloscUdzielonych', JSON.stringify(iloscUdzielonych));
              iloscPoprawnych=0;
              localStorage.setItem('iloscPoprawnych', JSON.stringify(iloscPoprawnych));           
              window.location.reload();
            }}> Resetuj procenty</Button>
          <a>{`Procent poprawnych odpowiedzi: ${((iloscPoprawnych/iloscUdzielonych)*100).toFixed(1)??0}%`}</a>
            {pytania.length > 1 ? (<><Typography>{`Przerobione pytania: ${2227-pytania.length}`}</Typography>
            <Typography>{`Pozostalo do przerobienia ${pytania.length}`}</Typography></>) : <></>}
            <br></br>
            <Box sx={{p: 2, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))'}}>

            <Typography variant="h5" sx={{ mb: 2 }}>
              {currentQuestion.q.tresc}
              {currentQuestion.q?.obrazek != undefined ? (
        <><img src={currentQuestion.q.obrazek} style={{ color: 'white' }}></img></>
      ) : <></>}
            </Typography>
            <Paper
              onClick={() => handleOptionClick('odpa')}
              elevation={selectedOption === 'odpa' ? 3 : 0}
              sx={{               
                padding: 2,
                margin: 1,
                cursor: "pointer",
                color: '#bfbebb',
                backgroundColor: 'inherit',
                border:
                  selectedOption && 'odpa' === currentQuestion.a
                  ? "solid #2fff00 5px"
                  : 'odpa' === selectedOption
                    ? "solid #ff0000 5px"
                      : "solid black 2px"
              }}
            >
              <Typography variant="body1">{currentQuestion.q.odpA.slice(20)}</Typography>
            </Paper>

            <Paper
              onClick={() => handleOptionClick('odpb')}
              elevation={selectedOption === 'odpb' ? 3 : 0}
              sx={{
                padding: 2,
                margin: 1,
                cursor: "pointer",
                color: '#bfbebb',
                backgroundColor: 'inherit',
                border:
                  selectedOption && 'odpb' === currentQuestion.a
                  ? "solid #2fff00 5px"
                  : 'odpb' === selectedOption
                    ? "solid #ff0000 5px"
                      : "solid black 2px"
              }}
            >
              <Typography variant="body1">{currentQuestion.q.odpB.slice(20)}</Typography>
            </Paper>

            <Paper
              onClick={() => handleOptionClick('odpc')}
              elevation={selectedOption === 'odpc' ? 3 : 0}
              sx={{                
                padding: 2,
                margin: 1,
                cursor: "pointer",
                color: '#bfbebb',
                backgroundColor: 'inherit',
                border:
                  selectedOption && 'odpc' === currentQuestion.a
                  ? "solid #2fff00 5px"
                  : 'odpc' === selectedOption
                    ? "solid #ff0000 5px"
                      : "solid black 2px"
              }}
            >
              <Typography variant="body1">{currentQuestion.q.odpC.slice(20)}</Typography>
            </Paper>

            <Paper
              onClick={() => handleOptionClick('odpd')}
              elevation={selectedOption === 'odpd' ? 3 : 0}
              sx={{                
                padding: 2,
                margin: 1,
                cursor: "pointer",
                color: '#bfbebb',
                backgroundColor: 'inherit',
                border:
                  selectedOption && 'odpd' === currentQuestion.a
                    ? "solid #2fff00 5px"
                    : 'odpd' === selectedOption
                      ? "solid #ff0000 5px"
                      : "solid black 2px"
              }}
            >
              <Typography variant="body1">{currentQuestion.q.odpD.slice(20)}</Typography>
            </Paper></Box>
          </CardContent>
        </Card>
          <Button variant="contained" onClick={handleNextClick} disabled={!selectedOption}>
            Dalej
          </Button>
        </>
      }
    </Box>
  );
};
