import { ui, whisper, filesystem, network } from '@oliveai/ldk'
import Patient from './Patient'

const { TextInput, Telephone,Checkbox, ListPair, Email, Button, Message, Link} = whisper.WhisperComponentType; 


// type Message = Component<WhisperComponentType.Message> & {
//     body?: string;
//     header?: string;
//     style?: Urgency;
//     textAlign?: TextAlign;
//   };

function SearchResultWhisper(rows){
    let result = []
    console.log(result)
    rows.forEach(row => {
        result.push({
            text: row._firstName + ' ' + row._lastName + ' ' + row._email,// clickable, email is the distinguisher if fn&ln are same 
            onClick: () => {
                console.log(row.seralize())

                whisper.create({
                    label: 'Consolidate Loop - Patient Search Result',
                    onClose: () => {
                      console.log('Patient Search Result');
                    },
                    components: [{
                        header: row._firstName + ' ' + row._lastName,
                        body: row.patientInfo.reduce((rst, k) => {
                            return `
${rst}
${k}:   ${row[k]}
                            `
                        }, ''),
                        type: Message
                    }]
                })
            },
            type: Link
        })
    })
    return whisper.create({
        label: 'Consolidate Loop - Patient Search Result',
        onClose: () => {
          console.log('Patient Search Result');
        },
        components: result
    })
}

export default () =>
  new Promise(async (resolve, reject) => {
    var uiStream;

    const patients =  await new Promise((resolve, reject) => {
        filesystem.readFile("./PatientInfo.txt").then((data) => {
            network.decode(data).then((decodedData) => {
                let pList = []
                decodedData.split('|').forEach(row => {
                    if(row) {
                        pList.push(new Patient(...row.split(':')))
                    }
                })
                resolve(pList)
            })
        }).catch(console.error)
    })


//     content += `
//     ${p._firstName} ${p._lastName} ${p.email}
// `
    ui.listenSearchbar((value) => {
        let rows = []
        patients.forEach(p => {
           // console.log(p.seralize(), p.getSearchCred())

            if (p.getSearchCred().includes(value)) {
                rows.push(p)
            }
        })
        //uiStream.cancel();//??? what is cancel ???

        SearchResultWhisper(rows)

    }).then((cancellable) => (uiStream = cancellable));
  });