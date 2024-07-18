import React, { useState } from 'react';

function DynamicForm() {
  const [jumlahOrang, setJumlahOrang] = useState(1);
  const [dataDiri, setDataDiri] = useState([
    { nama: '', nik: '', ttl: '', jk: 'Laki-Laki', agama: 'Islam', pekerjaan: '' }
  ]);

  const handleJumlahOrangChange = (e) => {
    const jumlah = parseInt(e.target.value, 10);
    setJumlahOrang(jumlah);

    // Perbarui array dataDiri berdasarkan jumlah orang yang dipilih
    const newDataDiri = [];
    for (let i = 0; i < jumlah; i++) {
      newDataDiri.push(dataDiri[i] || { nama: '', nik: '', ttl: '', jk: 'Laki-Laki', agama: 'Islam', pekerjaan: '' });
    }
    setDataDiri(newDataDiri);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newDataDiri = [...dataDiri];
    newDataDiri[index] = {
      ...newDataDiri[index],
      [name]: value
    };
    setDataDiri(newDataDiri);
  };

  return (
    <div>
      <label>Jumlah Orang:</label>
      <input
        type="number"
        value={jumlahOrang}
        onChange={handleJumlahOrangChange}
        min="1"
      />
      {dataDiri.map((data, index) => (
        <div key={index}>
          <h3>Data Diri Orang {index + 1}</h3>
          <input
            type="text"
            name="nama"
            value={data.nama}
            onChange={(e) => handleChange(index, e)}
            placeholder="Nama"
          />
          <input
            type="text"
            name="nik"
            value={data.nik}
            onChange={(e) => handleChange(index, e)}
            placeholder="NIK"
          />
          <input
            type="text"
            name="ttl"
            value={data.ttl}
            onChange={(e) => handleChange(index, e)}
            placeholder="TTL"
          />
          <select name="jk" value={data.jk} onChange={(e) => handleChange(index, e)}>
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <select name="agama" value={data.agama} onChange={(e) => handleChange(index, e)}>
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
          <input
            type="text"
            name="pekerjaan"
            value={data.pekerjaan}
            onChange={(e) => handleChange(index, e)}
            placeholder="Pekerjaan"
          />
        </div>
      ))}
    </div>
  );
}

export default DynamicForm;
