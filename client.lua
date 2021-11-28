

ESX = nil

Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(0)
    end
end)
local display = false

RegisterCommand('coinmenu', function()

    if not display then
        
            SetNuiFocus(true, true)
            SendNUIMessage({
                type = "ui"
            })
            SendNUIMessage({
                type = "updatee",
            })
            display = true
    else
        SendNUIMessage({
        type = "close",
    })
    display = false
    end
end)

RegisterNUICallback('escape', function() SetNuiFocus(false, false) end)

RegisterNUICallback("update", function(data,cb,amk)
    coins = true
    if coins then 
        cb(Config.Vehicle)
    else
        cb(false)
    end
end)

RegisterNUICallback('coinmiktar', function(data,cb)
    ESX.TriggerServerCallback('coinkontrol', function(coinmiktar)
        cb(coinmiktar)
    end)
end)

RegisterNUICallback("kontrol1", function(data,cb)
    ESX.TriggerServerCallback("coinkontrol",function(result)
        if result then
            cb(result)
        else
            cb(false)
        end
    end, data)
end)


RegisterNUICallback('buy', function(data)
 
    fiyat = tonumber(data.vehicleprice)
    model = data.vehiclename
    spawncode = data.spawncar
    Citizen.Wait(1000)
      local hash = GetHashKey(spawncode)
      if not HasModelLoaded(spawncode) then
              RequestModel(spawncode)
         while not HasModelLoaded(spawncode) do
         print('no vehicle spawn code')
         Citizen.Wait(10)
         end
     end
    lastSelectedVehicleEntity =  CreateVehicle(hash, -1268.70, -3375.80, 13.86, 332.380, 0, 1)
    local vehicleProps = ESX.Game.GetVehicleProperties(lastSelectedVehicleEntity)
    local newPlate     =  GeneratePlate()
    vehicleProps.plate = newPlate
    TriggerServerEvent('buyvehicledata', vehicleProps, fiyat, newPlate,spawncode)

end)


